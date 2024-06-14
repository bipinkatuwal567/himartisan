"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";

const AddToCart = () => {
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-5 flex flex-col w-full ">
      <h2 className="text-2xl font-bold border-b border-gray-300 pb-2">Cart</h2>
      <div className="mt-8 flex w-full lg:justify-between items-start lg:items-start gap-10 flex-col lg:flex-row">
        <table className="flex justify-between">
          <tbody>
            <tr className="grid grid-cols-4 sm:grid-cols-3 gap-10 place-items-start text-gray-600">
              <th className="col-span-2 font-normal sm:col-span-1">Products</th>
              <th className="font-normal">Quantity</th>
              <th className="font-normal">Subtotal</th>
            </tr>

            <tr className="mt-5 grid grid-cols-4 sm:grid-cols-3 w-full place-items-start justify-items-start gap-10">
              <td className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <Image
                  src={"/topi.png"}
                  height={70}
                  width={70}
                  className=" bg-gray-200 rounded-md"
                />
                <div className="flex flex-col">
                  <p className=" font-bold">
                    15-inch MacBook Air(2TB) - Midnight
                  </p>
                  <p className="text-gray-600">$2,099.00</p>
                </div>
              </td>

              <td className="flex items-center border border-black rounded-lg sm:gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setQty((prev) => {
                      if (prev < 1) return 1;
                      return prev - 1;
                    })
                  }
                >
                  -
                </Button>
                <p>{Number(qty)}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQty((prev) => prev + 1)}
                >
                  +
                </Button>
              </td>

              <td className="flex items-center flex-col sm:flex-row gap-2 md:gap-5">
                <p className="text-gray-600">$2,099.00</p>
                <FaTrash className="w-4 h-4 cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-col w-2/3 md:w-2/4 border-t border-t-gray-300 pt-5 lg:pt-0 lg:w-1/3 gap-6 border-l pl-4  lg:border-0">
          <p className=" font-bold">Summary</p>
          <div className="flex gap-2 justify-between">
            <p className="text-gray-600">Delivery Charage</p>
            <p className="text-gray-600">$0</p>
          </div>

          <div className="flex gap-2 justify-between">
            <p className="font-bold">Grand Total</p>
            <p className="font-bold">$2,099.00</p>
          </div>

          <Button>Login to checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
