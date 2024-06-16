import React from "react";
import HomePage from "../../components/HomePage";
import ProductPage from "../../components/ProductPage";
import CategoriesPage from "../../components/CategoriesPage";
import prisma from '../../db/dbconfig';

const page = async () => {
     
      const products=await prisma.product.findMany();
  return (
    <>
      <HomePage />
      <ProductPage AllProducts={products}/>
      <CategoriesPage />
    </>
  );
};

export default page;
