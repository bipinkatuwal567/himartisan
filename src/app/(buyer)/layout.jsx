'use client'
import React from "react";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


import Navbar from "../../components/Navbar";
import FooterPage from "../../components/FooterPage";

const layout = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {});
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <>
      <Navbar/>
      {children}
      <FooterPage />
    </>
  );
};

export default layout;
