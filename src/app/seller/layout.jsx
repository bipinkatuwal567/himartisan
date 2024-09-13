"use client"; // Ensures this component is treated as a client component

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import SellerNavbar from "../../components/SellerNavbar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// Rename the component to start with an uppercase letter
const Layout = ({ children }) => {

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      // Handle scroll events if needed
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up the animation frame on component unmount
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 grainy">
      <SellerNavbar />
      {children}
    </div>
  );
};

export default Layout;
