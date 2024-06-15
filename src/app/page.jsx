'use client'
import HomePage from "../components/HomePage";
import ProductPage from "../components/ProductPage";
import CategoriesPage from "../components/CategoriesPage"
import CategoryProduct from '../components/CategoryProduct'

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function Home() {
      useEffect(()=>{
            const lenis=new Lenis();

            lenis.on("scroll", (e)=>{

            });
            function raf(time){
                  lenis.raf(time);
                  requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf)
      },[])
  return (
    <>
      <HomePage />
      <ProductPage />
      <CategoriesPage />
      {/* <CategoryProduct/> */}
    </>
  );
}
