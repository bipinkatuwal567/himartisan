"use client"
import React, { useState } from "react";
import { Button } from "./ui/button";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import axios from 'axios'
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const SellerForm = () => {
      const router=useRouter()
      const [isLoading, setIsLoading]=useState(false)
      const [store, setStore]=useState("")
      const [storeDesc,setStoreDesc]=useState("")
      const [address, setAddress]=useState("")
      const {user}=useKindeBrowserClient()
      const [number, setNumber]=useState("")

      const handleSubmit=async()=>{
            if(number.length!==10)
                  return console.log("Number should be 10 digit")
      
            setIsLoading(true)
            const toastid=toast.loading("Registering Seller...");
            const name=user.given_name +" "+ user.family_name
            const email=user.email
            console.log(name, email)
            try {
                  const res=await axios.post('/api/register/seller', {name, email, contactNo:number, storeName:store,storeDescription:storeDesc, storeAddress:address}).then((res)=>{
                        console.log(res)
                        if(res.data.success){
                              toast.success("Seller Registered", {id:toastid})
                              setTimeout(()=>{
                                    router.replace('/')
                        },3000)
                        }
                        else{
                              toast.error(res.data.message, {id:toastid})
                              setTimeout(()=>{
                                    router.replace('/')
                        },3000)
                        }
                  })
      
            } catch (error) {
                  toast.error("Something went Wrong!", {id:toastid})
            } finally{
                  setIsLoading(false);
            }
      
      }


  return (
    <div className="w-full mx-auto p-4  h-screen flex flex-col justify-center sm:w-2/3 md:w-3/6 lg:w-2/6">
      <h2 className=" font-bold text-2xl">Register your store account!</h2>
      <form
        className="bg-white p-4 rounded-lg mt-5 flex flex-col gap-y-5"
      >
           
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Store's Name
          </label>
          <input
          value={store}
          onChange={(e)=>setStore(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Store Description
          </label>
          <input
          value={storeDesc}
          onChange={(e)=>setStoreDesc(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Address
          </label>
          <input
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Contact No
          </label>
          <input
          value={number}
          onChange={(e)=>setNumber(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
          />
        </div>

        <Button type="button" onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  );
};

export default SellerForm;
