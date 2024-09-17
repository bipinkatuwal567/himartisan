'use client'
import React from "react";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";


import Navbar from "../../components/Navbar";
import FooterPage from "../../components/FooterPage";
import { useSession } from "next-auth/react";
import { Suspense } from 'react';
const Layout = ({ children }) => {

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {});
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    

    requestAnimationFrame(raf);
  }, []);


  return (
    <>
       <Suspense fallback={<div>Loading...</div>}>
      <Navbar/>
      {children}
      <FooterPage />
       </Suspense>
    </>
  );
};

export default Layout;
