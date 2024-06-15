"use client";
import React, { useState } from "react";
import AvatarComponent from "../../../components/AvatarComponent";
import { Button } from "../../../components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const page = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(1);
  const [stock, setStock] = useState(1);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  function hanldeSubmit() {
    console.log("submitted");
  }

  return (
    <div className="p-4 xl:ml-80">
      <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="capitalize">
            <h6 className="block antialiased tracking-normal font-sans text-lg font-semibold leading-relaxed text-gray-900">
              Add your product here
            </h6>
          </div>

          <AvatarComponent
            img={user?.picture}
            altName={user?.given_name}
            list={["Dashboard", "Profile", "Add Product"]}
          />
        </div>
      </nav>

      <form className="rounded-lg mt-8 flex flex-col gap-y-3">
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-1 px-2 rounded-md focus:border-gray-300"
            // disabled={loading}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">
            Product Price <span className="text-red-500">*</span>
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-1 px-2 rounded-md focus:border-gray-300"
            // disabled={loading}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Product Stock <span className="text-red-500">*</span></label>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-1 px-2 rounded-md focus:border-gray-300"
            // disabled={loading}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Product Image <span className="text-red-500">*</span></label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            className="border-2 border-gray-200 outline-none p-1 px-2 rounded-md focus:border-gray-300"
            // disabled={loading}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Product Description <span className="text-red-500">*</span></label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-200 outline-none p-1 px-2 rounded-md focus:border-gray-300 h-24"
            // disabled={loading}
          />
        </div>

        <Button
          type="button"
          className=" self-start text-white"
          onClick={() => hanldeSubmit()}
        >
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default page;
