import React from "react";
import CategoryCard from "./CategoryCard";
import CategoryProduct from "./CategoryProduct";
import categories from '../data/category.json'
const CategoriesPage = () => {
      console.log(categories)

  return (
    <div className="mx-auto mt-8 flex flex-col gap-5">
        <h2 className="text-lg font-semibold">Shop by Categories</h2>
        {/* <CategoryCard title={"basket"} /> */}
        <div className="w-full flex flex-wrap gap-8 sm:gap-5 sm:justify-between justify-center sm:gap-y-8">

        {categories.map((category)=>(
              <CategoryProduct key={category} title={category} id="" image={category.imgName}/>
              ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
