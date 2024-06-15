"use client"

import React from "react";
import { Button } from "../../../../components/ui/button";
import axios from "axios";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import toast from "react-hot-toast";
const page = () => {

      const {user}=useKindeBrowserClient()

      const email=user?.email || "";

      const handleSubmit=async()=>{
            console.log("here", email)
            try {

                  await axios.post('/api/addtocart', {productId: "666dae02d262fd466aea768d",email })
                  .then(res=>{
                        if(res.data.success)
                              toast.success("Added to Cart")
                  })

            } catch (error) {
                  console.log(error)
            }
      }
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-y-8 h-[calc(108vh)] lg:h-[calc(100vh-18rem)] gap-x-4">
      <div className="w-full bg-gray-200 rounded-md lg:w-1/2 h-96">
        <img src="/khukuri.png" className="w-full h-full object-contain" />
      </div>

      <div className="mt-10 flex flex-col gap-y-3 lg:w-1/2">
        <div className="flex flex-col gap-y-2">
          <h2 className="font-bold text-2xl">Test Title</h2>
          <p className="text-sm">
            Weapons &nbsp; | &nbsp;{" "}
            <span className="text-green-500">In stock</span>
          </p>
        </div>

        <div className="mt-2">
          <p>$2,000.00</p>
        </div>

        <div className="flex  flex-col gap-2 mt-10">
          <h2 className="font-semibold text-lg">Description</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            libero consequuntur ad amet odit nulla eveniet error officiis ullam
            blanditiis nesciunt, exercitationem voluptas dolor tenetur.
          </p>
        </div>

        <Button className="uppercase" type="button" onClick={handleSubmit}>Add to cart</Button>
      </div>
    </div>
  );
};

export default page;
