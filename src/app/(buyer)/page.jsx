import React from "react";
import HomePage from "../../components/HomePage"
import ProductPage from "../../components/ProductPage"
import CategoriesPage from "../../components/CategoriesPage"

const page = () => {
  return (
    <>
      <HomePage />
      <ProductPage />
      <CategoriesPage />
    </>
  );
};

export default page;
