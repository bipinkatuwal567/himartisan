import React from "react";
import CategoryCard from "./CategoryCard";
import CategoryProduct from "./CategoryProduct";
import Categories from "../data/category.json";

const CategoriesPage = () => {
  return (
    <div className="mx-auto mt-8 flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Shop by Categories</h2>
      {/* <CategoryCard title={"basket"} /> */}
      <div className="w-full flex flex-wrap gap-8 sm:gap-5 sm:justify-between justify-center sm:gap-y-8">
        {Categories.map((category) => (
          <CategoryProduct title={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
