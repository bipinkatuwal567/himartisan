"use client"
import axios from 'axios';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function SellerPage() {
      const path=usePathname();
      const [seller, setSeller]=useState(null)
      const [products, setProducts]=useState(null)
      const [isLoading, setIsLoading]=useState(true)
      const sellerId=path.split("/")[2];
      useEffect(()=>{

            async function getSeller(){
                  await axios.get('/api/getsellerdetails', {params: {id:sellerId}})
                  .then((res)=>{
                        if(res.data.success){
                              setSeller(res.data.seller)
                              setProducts(res.data.products)
                              console.log(res.data)
                              setIsLoading(false);
                        }
                  }).catch((w)=>{
                        toast.error("Faild to get Seller Details!")
                  })
            }

            getSeller();


      },[sellerId])

  return (
    <div className='min-h-[calc(100vh-16rem)]'>
      {/* these are the basic information of seller */}
      <h1>{seller?.storeName}</h1>
      <h5>{seller?.storeDescription}</h5>

      <h1>{seller?.storeAddress}</h1>

      {/* list the products using map function  */}


    </div>
  )
}

export default SellerPage