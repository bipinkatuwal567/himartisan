"use client";
import React from "react";
import AvatarComponent from "../components/AvatarComponent";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const TopNavbarSeller = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();


  return (
    <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <h6 className="block antialiased tracking-normal font-sans text-lg font-semibold leading-relaxed text-gray-900">
            Dashboard
          </h6>
        </div>

        <AvatarComponent
          img={user?.picture}
          altName={user?.given_name}
          list={["Dashboard", "Profile", "Add Product"]}
        />
      </div>
    </nav>
  );
};

export default TopNavbarSeller;
