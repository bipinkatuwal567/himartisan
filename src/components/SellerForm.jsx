import React from "react";
import { Button } from "./ui/button";

const SellerForm = () => {
  return (
    <div className="w-full mx-auto p-4  h-screen flex flex-col justify-center sm:w-2/3 md:w-3/6 lg:w-2/6">
      <h2 className=" font-bold text-2xl">Register your store account!</h2>
      <form
        action="#"
        className="bg-white p-4 rounded-lg mt-5 flex flex-col gap-y-5"
      >
        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Store's Name
          </label>
          <input
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Store Description
          </label>
          <input
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="font-semibold" htmlFor="">
            Address
          </label>
          <input
            type="text"
            className="border-2 border-gray-200 outline-none p-2 rounded-md focus:border-gray-300"
          />
        </div>

        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default SellerForm;
