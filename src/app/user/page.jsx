"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { FaShoppingBag } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { getURL } from "next/dist/shared/lib/utils";

const Page = () => {
  const router = useRouter();
  const [isBuyer, setIsBuyer] = useState(true);
  const [isLoading, setIsLoading]=useState(true);
  const {data:session} = useSession()

  const handleClick = () => {
    if (isBuyer) {
      router.push("/user/newBuyer");
    } else {
      router.push("/user/newSeller");
    }
  };
  console.log("initial")

  useEffect(()=>{
      async function GetUser(){
         if(session){
            if(session?.user?.role!==null){

                  toast.error(` User With this email already exists as a ${session?.user?.role} `)
                  setTimeout(()=>{
                        router.replace('/')
                  },2000)
            }
            else{
                  setIsLoading(false)
            }
         }
      }

      GetUser()
  },[session])

  return (
    <div className="w-full lg:w-1/3 md:w-2/3 h-screen flex justify-center items-center mx-auto">
      <div className="flex flex-col">
        <h2 className="text-2xl sm:text-4xl font-bold">
          Choose your role in the trade
        </h2>
        <p className="mt-5 text-gray-600">
          Discover handcrafted treasures, choose buyer role or join seller
          community featuring cultural heritage crafts.
        </p>

        <div className="mt-10 flex flex-col w-full justify-between gap-10">
          <div
            className={`flex w-full items-center gap-3 px-5 py-5 rounded-md bg-white ${
              isBuyer ? "ring-2 ring-orange-300" : null
            }  ${isLoading? " text-gray-400 ring-gray-300":null}`}
            onClick={() => setIsBuyer(true)}
          >
            <FaShoppingBag className="w-12 h-10 text-white bg-orange-500 p-2 rounded-lg" />
            <div className="flex flex-col w-full">
              <h2 className="text-lg font-semibold uppercase">Buyer</h2>
              <p className="text-sm text-gray-500">I want to buy products</p>
            </div>
            <IoIosArrowForward className="w-6 h-6 justify-self-end" />
          </div>

          <div
            onClick={() => setIsBuyer(false)}
            className={`flex w-full items-center gap-3 px-5 py-5 rounded-md bg-white ${
              !isBuyer ? "ring-2 ring-orange-600" : null
            }  ${isLoading? " text-gray-400 ring-gray-300":null}`}
          >
            <FaTag className="w-12 h-10 text-white bg-orange-500 p-2 rounded-lg" />
            <div className="flex flex-col w-full">
              <h2 className="text-lg font-semibold uppercase">Seller</h2>
              <p className="text-sm text-gray-500">
                I want to sell my products
              </p>
            </div>
            <IoIosArrowForward className="w-6 h-6 justify-self-end" />
          </div>

          <Button className="text-md text-white" onClick={() => handleClick()} disabled={isLoading}>
            Continue <IoIosArrowForward className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
