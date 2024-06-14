import React from "react";
import CategoryCard from "./CategoryCard";
import CategoryProduct from "./CategoryProduct";

const CategoriesPage = () => {
  return (
    <div className="mx-auto mt-8 flex flex-col gap-5">
        <h2 className="text-lg font-semibold">Shop by Categories</h2>
        {/* <CategoryCard title={"basket"} /> */}
        <CategoryProduct />
    </div>
  );
};

export default CategoriesPage;
