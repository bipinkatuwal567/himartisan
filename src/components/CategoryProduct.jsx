import Link from "next/link";
import React from "react";

function CategoryProduct({ imgName, id, title }) {
  return (
    <div className=" w-auto h-54 bg-[rgba(0,0,0,0.06)] rounded-xl flex flex-col">
      <div className="w-full relative h-40  flex justify-center items-center overflow-hidden">
        <img
          src={`/new_images/category/${imgName}`}
          alt="basket"
          className="h-full w-auto hover:scale-105 transition duration-300"
        />
      </div>
      <div className="flex-grow p-4 flex justify-center items-end">
        <Link href={`products?category=${title}`} className="w-full">
          <button className="bg-white py-2 rounded-lg w-full text-sm  hover:bg-[rgba(255,255,255,0.8)]">
            {title}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CategoryProduct;
