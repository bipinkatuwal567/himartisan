"use client";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";
import { Button } from "./ui/button";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="flex w-full justify-between flex-col sm:flex-row items-center py-2 sticky top-0 z-50">
      <div className="flex backdrop-blur-sm bg-white/30 justify-between w-full sticky top-0 h-[4.5rem] items-center px-4 py-2 rounded-xl shadow-md grainy">
        <Link href={"/"} className="font-bold text-xl uppercase">
          Himartisan
        </Link>
        <div className="cursor-pointer">
          {openMenu ? (
            <FaXmark
              className="h-8 w-8 sm:hidden transition-all"
              onClick={() => setOpenMenu((openMenu) => !openMenu)}
            />
          ) : (
            <GiHamburgerMenu
              className="h-8 w-8 sm:hidden transition-al"
              onClick={() => setOpenMenu((openMenu) => !openMenu)}
            />
          )}
        </div>

        <div className="sm:flex md:gap-6 sm:gap-2 items-center hidden font-semibold">
          <Link
            className=" hover:bg-gray-200/70 px-3 py-2 rounded-md"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className=" hover:bg-gray-200/70 px-3 py-2 rounded-md"
            href={"/products?category=all"}
          >
            Product
          </Link>
          <Link
            className=" hover:bg-gray-200/70 px-3 py-2 rounded-md"
            href={"/cart"}
          >
            Cart(2)
          </Link>
          <div className="flex gap-3">
            <Link href={"/"}>
              <Button variant={"outline"} className="font-semibold">
                Sign up
              </Button>
            </Link>
            <Link href={"/"}>
              <Button>Sign in</Button>
            </Link>
          </div>
        </div>
      </div>
      {openMenu ? (
        <div className="mt-20 flex sm:flex-none absolute z-20 flex-col bg-white w-full items-center justify-between rounded-2xl p-4 gap-2 shadow-md font-semibold sm:hidden animate-navbar-down grainy">
          <Link
            href={"/"}
            className=" hover:bg-gray-200/70 px-3 py-2 rounded-md"
            onClick={() => setOpenMenu(false)}
            >
            Home
          </Link>
          <Link
            href={"/"}
            className=" hover:bg-gray-200/70 px-3 py-2 rounded-md"
            onClick={() => setOpenMenu(false)}
            >
            Product
          </Link>
          <Link
            href={"/cart"}
            className=" hover:bg-gray-200/70 px-3 py-2 rounded-md"
            onClick={() => setOpenMenu(false)}
          >
            Cart
          </Link>
          <Link href={"/"}>
            <Button variant={"outline"} className="font-semibold">
              Sign up
            </Button>
          </Link>
          <Link href={"/"}>
            <Button>Sign in</Button>
          </Link>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
