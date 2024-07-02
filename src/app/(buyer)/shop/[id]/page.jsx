"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../../../components/productcard";

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
      <div className="w-full mt-3 flex gap-4 items-center bg-gray-200/75 rounded p-4">
        <div>
          <img
            src={data?.user?.image}
            alt="store image"
            className="w-full rounded-full"
          />
        </div>

        <div>
          <h2 className="font-semibold text-lg">{seller?.storeName}</h2>
          <h2 className="text-gray-500">{seller?.storeAddress}</h2>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="border-b border-black">Description</h2>
        <p className="mt-3">{seller?.storeDescription}</p>
      </div>

      {/* list the products using map function  */}
      <div>
        {products.map((item) => {
          return (
            <ProductCard
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              imgName={item.ImagePath}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SellerPage;
