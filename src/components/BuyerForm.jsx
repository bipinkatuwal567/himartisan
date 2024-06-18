"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const BuyerForm = ({user}) => {

      console.log(user)
  const [number, setNumber] = useState("");
  const router=useRouter()
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (number.length !== 10) return console.log("Number should be 10 digit");

    setIsLoading(true);
    const toastid = toast.loading("Registering User...");
    try {
      const res = await axios
        .post("/api/register/buyer", {contactNo: number })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            toast.success("User Registered", { id: toastid });
            setTimeout(()=>{
                  router.replace('/')
      },3000)
          } else {
            toast.error(res.data.message, { id: toastid });
            setTimeout(()=>{
                  router.replace('/')
      },3000)
          }
        });
    } catch (error) {
      toast.error("Something went Wrong!", { id: toastid });
    } finally {
      setIsLoading(false);
    }
  };

   
  return (
    <div className="w-full mx-auto p-4  h-screen flex flex-col justify-center sm:w-2/3 md:w-3/6 lg:w-2/6">
      <h2 className=" font-bold text-2xl">Register your account!</h2>
      <form className="bg-white p-4 rounded-lg mt-5 flex flex-col gap-y-5">
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Contact Number
          </label>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
            disabled={loading}
          />
        </div>

        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BuyerForm;
