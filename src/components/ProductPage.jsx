"use client";
import { useState } from "react";
import ProductCard from "./productcard";
import data from "../data/productlists.json";
import ProductSkeleton from "../components/productskeleton";

const ProductPage = ({AllProducts}) => {
  const [products, setProducts] = useState(AllProducts.length>8 ? AllProducts.slice(0,8): AllProducts);
  return (
    <div className="mt-12 w-full flex flex-col mx-auto">
      <h2 className=" justify-self-start mb-5 font-semibold text-xl">
        Trending Products
      </h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-5 sm:justify-between justify-center sm:gap-y-8">
        {products.map((product) => {
          if (!product.isTrending) {

            return (
              <ProductCard
                key={product.name}
                id={product.id}
                imgName={product.ImagePath}
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
