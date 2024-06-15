"use client"
import {useEffect, useState} from 'react'
import ProductCard from '../../components/productcard';
import data from "../../data/productlists.json";
import { useParams, useSearchParams } from 'next/navigation';

export default function ProductPage(){
  const [products, setProducts] = useState([]);

  const searchParams = useSearchParams()
 
  const search = searchParams.get('category')
  console.log(search)

  useEffect(()=>{
      if(search!==""){
            const tempproducts=data.filter((product)=>product.category===search)
            setProducts(tempproducts);

      }
  },[])

      return (
            <div className="mt-12 w-full flex flex-col mx-auto">
            <h2 className=" justify-self-start mb-5 font-semibold text-xl lg:text-3xl">
              {search==="" | search===null ? "Products": `Products | Category: ${search}`}
            </h2>
            <div className="w-full flex flex-wrap gap-8 sm:gap-5 sm:justify-between justify-center sm:gap-y-8">
              {products.map((product) => {
                return (
                  <ProductCard
                  key={product.name}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    imgName={product.imgName}
                  />
                );
              })}
            </div>
          </div>
      )
}