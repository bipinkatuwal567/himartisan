"use client"

import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Link } from "lucide-react";
const Page = () => {
      const pathname=usePathname();
      const id=pathname.split('/')[2]

      const [product, setProduct]=useState(null);
      const [seller, setSeller]=useState(null)
      const [isLoading, setIsLoading]=useState(false)
      const [url, setUrl]=useState("");   
      const {data:session}=useSession()
      

      const handleSubmit=async()=>{
            setIsLoading(true)
            
            try {

                  await axios.post('/api/addtocart', {productId: id })
                  .then(res=>{
                        if(res.data.success)
                              toast.success("Added to Cart")
                        else{
                              toast.error(res.data.message)
                        }
                  })

            } catch (error) {
            } finally{
                  setIsLoading(false)
            }
      }


      useEffect(()=>{
            async function getProduct(){
                  await axios.get(`/api/getProduct?id=${id}`)
                  .then((res)=>{
                        if(res.data.success){
                              setProduct(res.data.product)
                              setSeller(res.data.seller)
                              const image=`Images%2F${res.data.product?.ImagePath?.split("/")[1]}`
                              const temp=`https://firebasestorage.googleapis.com/v0/b/first-hackathon-ecommerce.appspot.com/o/${image}?alt=media&token=6277845b-c2ca-43fb-931a-be27634e4069`
                              setUrl(temp);
                        }
                  })
            }
            getProduct()
      },[id])
    
  return (
      <>



{product!==null? (
  <div className="mt-8 flex flex-col lg:flex-row gap-y-8 h-[calc(108vh)] lg:h-[calc(100vh-18rem)] gap-x-4">
  <div className="w-full bg-gray-200 rounded-md lg:w-1/2 h-96">
    <img src={url || ""} className="w-full h-full object-contain" />


    
  </div>

  <div className="mt-10 flex flex-col gap-y-2 lg:w-1/2">
    <div className="flex flex-col gap-y-1">
      <h2 className="font-bold text-2xl">{product.name || "Test"}</h2>
      <p className="text-sm">
        {product.category || ""} &nbsp; | &nbsp;{" "}
        {product.stock>0?<span className="text-green-500">In stock   ({product.stock})</span>:<span className="text-red-500">Out Of Stock</span>}
      </p>
    </div>

    <div className="mt-2">
      <p>{`Rs. ${product.price}`}</p>
    </div>

    <div className="flex  flex-col gap-2 mt-8">
      <h2 className="font-semibold text-lg">Description</h2>
      <p className="text-gray-600">
       {product.description} 
      </p>
    </div>


    <div className="flex  flex-col gap-2 mt-8">
      <h2 className="font-semibold text-lg">Sold By</h2>
      <p className="text-gray-600">
       {seller?.storeName || ""} |  <span className="hover:text-orange-500"> <a href={`/shop/${seller.id}`}>Visit Store</a></span>
      </p>
     
    </div>


  {session?.user ? (
 <Button
 disabled={isLoading || product.stock <= 0}
 
 type="button"
 onClick={handleSubmit}
>
 {isLoading ? 'Adding...' : 'Add to Cart'}
</Button>
  ):(
<Button type="button" onClick={()=>signIn("google")}>
      Sign In to Add
</Button>
  )}
  </div>
</div>
):(
      <div className="mt-8 flex flex-col lg:flex-row gap-y-8 h-[calc(108vh)] lg:h-[calc(100vh-18rem)] gap-x-4">
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
        <h2 className="font-semibold text-lg text-gray-400">Loading...</h2>
        <p className="text-gray-400">Loading...</p>
        <p className="text-gray-400">Loading...</p>
        <p className="text-gray-400">Loading...</p>
      </div>

      {/* Placeholder button */}
      <Button className="uppercase bg-gray-200 text-gray-400 cursor-not-allowed" disabled>
        Loading...
      </Button>
    </div>
  </div>
)}
      
</>
      );
};

export default Page;
