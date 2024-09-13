"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../../components/productcard";
import ProductSkeleton from "../../../components/productskeleton";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const search = searchParams.get("category");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.get('/api/getproducts'); // Ensure this URL is correct
        if (response.data.success) {
          if (search === "All" || search === null || search === "") {
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
      } finally {
        setIsLoading(false); // Stop loading
      }
    }

    fetchData();
  }, [search]); // Dependency on 'search' state

  return (
    <div className="mt-8 w-full flex flex-col mx-auto min-h-[calc(100vh-18rem)]">
      <h2 className="justify-self-start mb-5 font-bold text-lg sm:text-xl">
        {search === "" || search === null
          ? "Products"
          : `Products | Category: ${search}`}
      </h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-5 sm:justify-between justify-center sm:gap-y-8">
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
          products.map((product) => (
            <ProductCard
              key={product.id} // Use product.id or a unique identifier for the key
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              imgName={product.ImagePath}
            />
          ))
        )}
      </div>
    </div>
  );
}
