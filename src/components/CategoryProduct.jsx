import React from "react";

function CategoryProduct({ image, id, title }) {
  return (
    <div className="w-full h-64 sm:w-72 sm:h-72 bg-[rgba(0,0,0,0.06)] rounded-xl flex flex-col">
      <div className="w-full relative h-40 flex mt-5 sm:mt-10 justify-center items-center overflow-hidden">
        <img
          src="/khukuri.png"
          alt="basket"
          className="h-full w-auto hover:scale-105 transition duration-300"
        />
      </div>
      <div className="flex-grow p-4 flex justify-center items-end">
        <a href="/" className="w-full">
          <button className="bg-white py-2 rounded-lg w-full text-sm  hover:bg-[rgba(255,255,255,0.8)]">
            {title}
          </button>
        </a>
      </div>
    </div>
  );
}

export default CategoryProduct;
