"use client";
import React from "react";
import AvatarComponent from "../components/AvatarComponent";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useSession } from "next-auth/react";

const TopNavbarSeller = () => {
const {data:session}=useSession()

  return (
    <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <h6 className="block antialiased tracking-normal font-sans text-lg font-semibold leading-relaxed text-gray-900">
            Dashboard
          </h6>
        </div>

        <AvatarComponent
          img={session?.user?.image}
          altName={session?.user?.name}
          list={["Dashboard", "Profile", "Add Product"]}
        />
      </div>
    </nav>
  );
};

export default TopNavbarSeller;
