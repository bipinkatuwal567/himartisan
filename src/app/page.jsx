"use client";
import HomePage from "../components/HomePage";
import ProductPage from "../components/ProductPage";
import CategoriesPage from "../components/CategoriesPage";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <HomePage />
      <ProductPage />
      <CategoriesPage />
    </div>
  );
}
