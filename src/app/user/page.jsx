"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { FaShoppingBag } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [isBuyer, setIsBuyer] = useState(true);

  const handleClick = () => {
    if (isBuyer) {
      router.push("/newBuyer");
    } else {
      router.push("/newSeller");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="flex flex-col">
        <h2>Choose your role in the trade</h2>
        <p>
          Discover handcrafted treasures, choose buyer role or join seller
          community featuring cultural heritage crafts.
        </p>

        <div className="mt-10 flex flex-col w-full justify-between gap-10">
          <div
            className={`flex w-full rounded-md bg-white ${
              isBuyer ? "ring-2 ring-orange-600" : null
            }`}
            onClick={() => setIsBuyer(true)}
          >
            <FaShoppingBag />
            <div className="flex flex-col gap-2 w-full">
              <h2>Buyer</h2>
              <p>I want to buy products</p>
            </div>
            <IoIosArrowForward className="w-6 h-6 justify-self-end" />
          </div>

          <div
            onClick={() => setIsBuyer(false)}
            className={`flex w-full rounded-md bg-white ${
              !isBuyer ? "ring-2 ring-orange-600" : null
            }`}
          >
            <FaTag />
            <div className="flex flex-col gap-2 w-full">
              <h2>Seller</h2>
              <p>I want to sell my products</p>
            </div>
            <IoIosArrowForward className="w-6 h-6 justify-self-end" />
          </div>

          <Button className="text-md" onClick={() => handleClick()}>
            Continue <IoIosArrowForward className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
