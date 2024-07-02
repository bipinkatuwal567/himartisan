"use client";
import React, { useState } from "react";
import AvatarComponent from "../../../components/AvatarComponent";
import { Button } from "../../../components/ui/button";
import { storage } from "../../../db/firebase";
import { ref, uploadBytes } from "firebase/storage";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
const Page = () => {
  const {data:session}=useSession()
  const router=useRouter()

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(1);
  const [stock, setStock] = useState(1);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const inputRef = React.useRef(null);
  const selectRef=React.useRef(null)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
      let toastId=undefined

  async function hanldeSubmit() {
      if(selectedCategory===null || selectedCategory==="" )
      return;
      try {
       toastId=toast.loading("Adding Product...")
      setIsLoading(true);
      console.log(selectRef)
      const file = inputRef.current.files[0];
      const ImagePath = `Images/${Math.floor(new Date().getTime() / 1000)}.${
        file.name.split(".")[1]
      }`;
      const fileRef = ref(storage, ImagePath);
      const snapshot = await uploadBytes(fileRef, file);
      console.log(selectedCategory)
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
            if(res.data.success){
                  toast.success("Added Successfully", {id:toastId})
                  setTitle("")
                  setPrice("")
                  setDescription("")
                  setStock("")

            }
                 
        });
      // router.push('/seller')
    } catch (error) {
      toast.error("Failed to Add Product",{id:toastId})
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
            img={session?.user?.image}
            altName={session?.user?.name}
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
            required
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
            required
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
            required
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
            required
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">
            Product Category<span className="text-red-500">*</span>
          </label>
          <select
          
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value={selectedCategory}
        onChange={(e)=>setSelectedCategory(e.target.value)}
        required
      >
        <option hidden disabled selected value="">Select a Category</option>
        <option value="Furniture">Furniture</option>
        <option value="Home Decor and Items">Home Decor and Items</option>
        <option value="Weapons">Weapons</option>
        <option value="Musical Instruments">Musical Instruments</option>
      </select>
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
