"use client";
import React, { useState } from "react";
import AvatarComponent from "../../../components/AvatarComponent";
import { Button } from "../../../components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { storage } from "../../../db/firebase";
import { ref, uploadBytes } from "firebase/storage";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import axios from "axios";
import { useRouter } from "next/navigation";
const Page = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const router=useRouter()

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(1);
  const [stock, setStock] = useState(1);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = React.useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  async function hanldeSubmit() {
    setIsLoading(true);
    console.log(image);
    try {
      const file = inputRef.current.files[0];
      console.log(file.name.split(".")[1]);
      const ImagePath = `Images/${Math.floor(new Date().getTime() / 1000)}.${
        file.name.split(".")[1]
      }`;
      const fileRef = ref(storage, ImagePath);
      const snapshot = await uploadBytes(fileRef, file);
      console.log("Uploaded", snapshot);

      await axios
        .post("/api/addproduct", {
          name: title,
          price,
          stock:parseInt(stock),
          description,
          ImagePath,
          category: selectedCategory,
        })
        .then((res) => {
          console.log(res.data);
        });
      console.log("submitted");
      router.push('/seller')
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
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
            disabled={isLoading}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-1 px-2 rounded-md focus:border-gray-300"
            // disabled={loading}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            disabled={isLoading}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-1 px-2 rounded-md focus:border-gray-300"
            // disabled={loading}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">
            Product Image <span className="text-red-500">*</span>
          </label>
          <input
            disabled={isLoading}
            onChange={(e) => setImage(e.target.files[0])}
            ref={inputRef}
            type="file"
            className="border-2 border-gray-200 outline-none p-1 px-2 rounded-md focus:border-gray-300"
            // disabled={loading}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">
            Product Category<span className="text-red-500">*</span>
          </label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup  value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Home Decor and Items">Home Decor and Items</SelectItem>
                <SelectItem value="Weapons">Weapons</SelectItem>
                <SelectItem value="Musical Instruments">Musical Instruments</SelectItem>

              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            disabled={isLoading}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-200 outline-none p-1 px-2 rounded-md focus:border-gray-300 h-24"
            // disabled={loading}
          />
        </div>

        <Button
          disabled={isLoading}
          type="button"
          className=" self-start text-white"
          onClick={() => hanldeSubmit()}
        >
          {isLoading ? "Adding Product..." : "Add Product"}
        </Button>
      </form>
    </div>
  );
};

export default Page;
