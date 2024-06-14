"use client";
import HomePage from "../components/HomePage";
import ProductPage from "../components/ProductPage";
<<<<<<< HEAD
import CategoriesPage from "../components/CategoriesPage";
import "./locomotive-scroll.css";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
=======
import CategoriesPage from "../components/CategoriesPage"
import CategoryProduct from '../components/CategoryProduct'
>>>>>>> refs/remotes/origin/main

export default function Home() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    return () => {
      scroll.destroy();
    };
  }, []);
  return (
    <div
      ref={scrollRef}
      className="scroll-container"
      data-scroll
      data-scroll-speed={5}
    >
      <HomePage />
      <ProductPage />
      <CategoriesPage />
<<<<<<< HEAD
    </div>
=======
      {/* <CategoryProduct/> */}
    </>
>>>>>>> refs/remotes/origin/main
  );
}
