"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import SellerNavbar from "../../components/SellerNavbar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


const layout = ({ children }) => {

  useEffect(() => {

      async function getUser(){
            const email=user.email;

      }
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
      {/* <Navbar /> */}
      {/* {children} */}
      {/* <!-- component --> */}
      <div className="min-h-screen bg-gray-50/50 grainy">
        <SellerNavbar />
        {children}
      </div>
    </>
  );
};

export default layout;
