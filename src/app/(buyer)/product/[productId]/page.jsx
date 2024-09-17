"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Link } from "lucide-react";
import { formatDate } from "../../../../lib/formatDate";
const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [seller, setSeller] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewloading, setReviewLoading] = useState(true);

  const [url, setUrl] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await axios.post("/api/addtocart", { productId: id }).then((res) => {
        if (res.data.success) toast.success("Added to Cart");
        else {
          toast.error(res.data.message);
        }
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getProduct() {
      await axios.get(`/api/getProduct?id=${id}`).then((res) => {
        if (res.data.success) {
          setProduct(res.data.product);
          setSeller(res.data.seller);
          const image = `Images%2F${
            res.data.product?.ImagePath?.split("/")[1]
          }`;
          const temp = `https://firebasestorage.googleapis.com/v0/b/first-hackathon-ecommerce.appspot.com/o/${image}?alt=media&token=6277845b-c2ca-43fb-931a-be27634e4069`;
          setUrl(temp);
          getReviews()
        }
      });
    }
    getProduct();


 
  }, []);

     async function getReviews(){
      await axios.get(`/api/getreviews?id=${id}`).then((res) => {
            if (res.data.success) {
              setReviews(res.data.reviews);
              setReviewLoading(false)
            } 
          });
    }
  
  console.log(reviews)
  return (
    <div className="flex justify-start flex-col items-center min-h-[calc(100vh-16rem)]">
      {product !== null ? (
        <div className=" max-w-[1200px] w-full">
          <div className="mt-8 flex flex-col md:flex-row gap-y-8 h-auto mb-5 gap-x-4">
            <div className="w-full bg-gray-200 rounded-md md:w-1/2 h-96">
              <img src={url || ""} className="w-full h-full object-contain" />
            </div>

            <div className="mt-10 flex flex-col gap-y-2 md:w-1/2">
              <div className="flex flex-col gap-y-1">
                <h2 className="font-bold text-2xl">{product.name || "Test"}</h2>
                <p className="text-sm">
                  {product.category || ""} &nbsp; | &nbsp;{" "}
                  {product.stock > 0 ? (
                    <span className="text-green-500">
                      In stock ({product.stock})
                    </span>
                  ) : (
                    <span className="text-red-500">Out Of Stock</span>
                  )}
                </p>
              </div>

              <div className="mt-2">
                <p>{`Rs. ${product.price}`}</p>
              </div>

              <div className="flex  flex-col gap-2 mt-8">
                <h2 className="font-semibold text-lg">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="flex  flex-col gap-2 mt-8">
                <h2 className="font-semibold text-lg">Sold By</h2>
                <p className="text-gray-600">
                  {seller?.storeName || ""} |{" "}
                  <span className="hover:text-orange-500">
                    {" "}
                    <a href={`/shop/${seller.id}`}>Visit Store</a>
                  </span>
                </p>
              </div>

              {session?.user ? (
                <Button
                  disabled={isLoading || product.stock <= 0}
                  type="button"
                  onClick={handleSubmit}
                >
                  {isLoading ? "Adding..." : "Add to Cart"}
                </Button>
              ) : (
                <Button type="button" onClick={() => signIn("google")}>
                  Sign In to Add
                </Button>
              )}
            </div>
          </div>

          <div className="w-full pt-4 border-t border-slate-300 max-w-[1200px] flex justify-center items-center flex-col">
            <h1 className="text-3xl mb-4 font-semibold self-start">Reviews </h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                  {reviews.length>0 ?
                  <>
                        {reviews.map((review)=>(
                              <div key={review.id} className="bg-white p-2 rounded-md shadow-md flex justify-between gap-4 max-w-[420px] items-center">
                                    <div className="w-1/3 rounded-full p-3">
                                          <img src={review.userImage} alt="" className="rounded-full" />
                                    </div>
                                    <div className="w-2/3">
                                          <h1 className="text-black font-semibold text-lg ">{review.username}</h1>
                                          <p className=" font-light text-slate-600 text-sm">Rating: {review.rating}/5</p>
                                          <p className=" font-light text-slate-600 text-sm">Review: &quot;{review.review}&quot;</p>
                                          <p className=" font-light text-slate-600 text-sm">Reviewed On: {formatDate(review.createdAt)}</p>

                                    </div>

                              </div>
                        ))}
                  </>
                  :
                  <div className="p-4 text-xl ">{reviewloading ? "Getting Reviews of Product":"No Reviews to Show"}</div>
                  }
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col lg:flex-row gap-y-8 h-[calc(108vh)] w-[1500px] lg:h-[calc(100vh-18rem)] gap-x-4">
          <div className="w-full bg-gray-200 rounded-md lg:w-1/2 h-96 animate-pulse">
            {/* Placeholder content with pulse animation */}
          </div>

          <div className="mt-10 flex flex-col gap-y-3 lg:w-1/2">
            <div className="flex flex-col gap-y-2">
              <h2 className="font-bold text-2xl text-gray-400">Loading...</h2>
              <p className="text-sm text-gray-400">Loading...</p>
            </div>

            <div className="mt-2">
              <p className="text-gray-400">Loading...</p>
            </div>

            <div className="flex flex-col gap-2 mt-10">
              <h2 className="font-semibold text-lg text-gray-400">
                Loading...
              </h2>
              <p className="text-gray-400">Loading...</p>
              <p className="text-gray-400">Loading...</p>
              <p className="text-gray-400">Loading...</p>
            </div>

            {/* Placeholder button */}
            <Button
              className="uppercase bg-gray-200 text-gray-400 cursor-not-allowed"
              disabled
            >
              Loading...
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
