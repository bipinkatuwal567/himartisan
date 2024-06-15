"use client";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productcard";
import data from "../../data/productlists.json";
import { useParams, useSearchParams } from "next/navigation";
import ProductSkeleton from "../../components/productskeleton";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  console.log(isLoading);
  const search = searchParams.get("category");

  useEffect(() => {
    setIsLoading(true);
    if (search === "All") {
      setIsLoading(false);
      return setProducts(data);
    }

    if (search !== null) {
      const tempproducts = data.filter(
        (product) => product.category === search
      );
      setProducts(tempproducts);
      setIsLoading(false);
    }
  }, [search]);

  return (
    <div className="mt-8 w-full flex flex-col mx-auto">
      <h2 className=" justify-self-start mb-5 font-bold text-lg sm:text-xl">
        {(search === "") | (search === null)
          ? "Products"
          : `Products | Category: ${search}`}
      </h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-5 sm:justify-between justify-center sm:gap-y-8">
        {isLoading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : (
          <>
            {products.map((product) => (
              <ProductCard
                key={product.title}
                name={product.title}
                description={product.description}
                price={product.price}
                imgName={product.imgName}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
