"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../../../components/productcard";
import ProductSkeleton from "../../../../components/productskeleton";

import Image from 'next/image'

function SellerPage() {
  const path = usePathname();
  const { data } = useSession();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const sellerId = path.split("/")[2];
  useEffect(() => {
    async function getSeller() {
      await axios
        .get("/api/getsellerdetails", { params: { id: sellerId } })
        .then((res) => {
          if (res.data.success) {
            setSeller(res.data.seller);
            setProducts(res.data.products);
            setIsLoading(false);
          }
        })
        .catch((w) => {
          toast.error("Faild to get Seller Details!");
        });
    }

    getSeller();
  }, [sellerId]);

  console.log("Products: ", products);
  console.log("seller: ", seller);

  return (
    <div className="w-full flex flex-col gap-4 min-h-[calc(100vh-16rem)] items-start">
      {/* these are the basic information of seller */}
   { seller ?  <div className="w-full mt-3 flex gap-4 items-center bg-gray-200/75 rounded p-4">
        <div>
          <Image
            src={seller?.image || ""}
            alt="store image"
            className="w-full rounded-full"
            width={400}
            height={400}
          />
        </div>

        {seller && <div>
          <h2 className="font-semibold text-lg">{seller?.storeName}</h2>
          <h2 className="text-gray-500">{seller?.storeAddress}</h2>
          <h2 className="text-gray-500">Since {seller?.createdAt.split("T")[0]}</h2>


        </div>}
      </div>:
     <div className="w-full mt-3 flex gap-4 items-center bg-gray-200/75 rounded p-4">
     <div className="rounded-full w-24 h-24 bg-gray-300 animate-pulse" />
   
     <div className="w-full h-full flex flex-col gap-y-2">
       <div className="max-w-96 w-full bg-gray-300 h-4 rounded-full animate-pulse" />
       <div className="max-w-60 w-full bg-gray-300 h-4 rounded-full animate-pulse" />
       <div className="max-w-52 w-full bg-gray-300 h-4 rounded-full animate-pulse" />
     </div>
   </div>
   }

      {seller ? <div className="mt-5">
        <h2 className="border-b border-black">Description</h2>
        <p className="mt-3">{seller?.storeDescription}</p>
      </div>:
      <div className="mt-5 h-16 w-full flex flex-col gap-y-2">
             <div className=" max-w-32 w-full bg-gray-300 h-4 rounded-full animate-pulse"/>
             <div className="max-w-96 w-full bg-gray-300 h-4 rounded-full animate-pulse"/>

    </div>
      }

      {/* list the products using map function  */}
      <h1 className="text-2xl">Products</h1>
    {products ?  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-5 sm:justify-between justify-center sm:gap-y-8">
        {products && products.map((item) => {
          return (
            <ProductCard
            key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              imgName={item.ImagePath}
            />
          );
        })}
      </div>:
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-5 sm:justify-between justify-center sm:gap-y-8">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
      </div>}
    </div>
  );
}

export default SellerPage;
