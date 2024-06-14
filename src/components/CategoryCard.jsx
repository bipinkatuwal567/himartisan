import React from "react";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

function CategoryCard({ title }) {
  return (
    <Card className="w-full h-96 sm:w-72 sm:h-72 bg-transparent flex flex-col rounded-xl bg-red-300">
      <CardHeader className="w-full relative h-2/3 bg-[rgba(0,0,0,0.06)] flex justify-center items-center overflow-hidden">
        <img
          src="/new_images/basket.png"
          alt="basket"
          className="w-3/5 h-auto object-contain hover:scale-105 transition duration-300"
        />
        <Button className="absolute bottom-4 mx-auto w-11/12 bg-white hover:bg-gray-100 z-20">
          {title}
        </Button>
      </CardHeader>
    </Card>
  );
}

export default CategoryCard;
