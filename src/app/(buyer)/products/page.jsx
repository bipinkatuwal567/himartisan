"use client";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/productcard";
import data from "../../../data/productlists.json";
import { useParams, useSearchParams } from "next/navigation";
import ProductSkeleton from "../../../components/productskeleton";
import axios from "axios";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  console.log(isLoading);
  const search = searchParams.get("category");

  useEffect(() => {
      async function fetchData() {
        try {
          setIsLoading(true); // Start loading
          console.log("Nice ork")
          const response = await axios.get('http://localhost:3000/api/getproducts');
          console.log(response.data.products)
          if (response.data.success) {
            if (search === "All") {
              setProducts(response.data.products);
            } else {
              const filteredProducts = response.data.products.filter(
                (product) => product.category === search
              );
              setProducts(filteredProducts);
            }
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          // Handle error state appropriately
        } finally {
          setIsLoading(false); // Stop loading
        }
      }
  
      fetchData();
    }, [search]); // Dependency on 'search' state

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
              id={product.id}
                key={product.name}
                name={product.name}
                description={product.description}
                price={product.price}
                imgName={product.ImagePath}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
