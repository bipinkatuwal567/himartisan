import React from "react";
import CategoryProduct from "./CategoryProduct";
import categories from "../data/category.json";
const CategoriesPage = () => {
  return (
    <div className="mx-auto mt-10 pt-5 border-t border-gray-300 flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Shop by Categories</h2>
      {/* <CategoryCard title={"basket"} /> */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-5 sm:justify-between justify-center sm:gap-y-8">
        {categories.map((category) => (
          <CategoryProduct
            imgName={category.imgName}
            key={category.title}
            title={category.title}
            id=""
            image={category.imgName}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
