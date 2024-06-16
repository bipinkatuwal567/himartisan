import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

function ProductCard({ id, name, description, price, imgName }) {
      const image=`Images%2F${imgName.split("/")[1]}`

      const url=`https://firebasestorage.googleapis.com/v0/b/first-hackathon-ecommerce.appspot.com/o/${image}?alt=media&token=6277845b-c2ca-43fb-931a-be27634e4069`

  return (
    <Card className="w-full h-96 sm:w-auto sm:h-72 bg-transparent flex flex-col">
      <CardHeader className="className='w-full overflow-hidden relative h-2/3 bg-[rgba(0,0,0,0.06)] flex justify-center items-center overflow-hidden'">
        <img
          src={url}
          alt="basket"
          className="w-11/12 h-auto hover:scale-105 transition duration-300"
        />
      </CardHeader>

      <Link href={`/product/${id}`}>
        <CardContent className="w-full flex-1 p-2 flex flex-col gap-y-2 cursor-pointer">
          <CardTitle className="font-semibold text-lg truncate">
            {name}
          </CardTitle>
          <CardDescription className="text-sm truncate">
            {description}
          </CardDescription>
          <p>Rs. {price}.00</p>
        </CardContent>
      </Link>
    </Card>
  );
}

export default ProductCard;
