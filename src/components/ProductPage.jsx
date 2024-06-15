"use client";
import { useState } from "react";
import ProductCard from "./productcard";
import data from "../data/productlists.json";
import ProductSkeleton from "../components/productskeleton";

const ProductPage = () => {
  const [products, setProducts] = useState(data);

  return (
    <div className="mt-12 w-full flex flex-col mx-auto">
      <h2 className=" justify-self-start mb-5 font-semibold text-xl">
        Trending Products
      </h2>
      <div className="w-full flex flex-wrap gap-8 sm:gap-5 sm:justify-between justify-center sm:gap-y-8">
        {products.map((product) => {
          if (product.isTrending) {
            return (
              <ProductCard
                title={product.title}
                imgName={product.imgName}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProductPage;
