import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
function ProductSkeleton() {
  return (
    <Card className="w-full h-96 sm:w-auto sm:h-80 md:h-[20rem] lg:h-[24rem] bg-transparent flex flex-col">
      <div className="w-full h-48  bg-gray-300 animate-pulse "  />
      <CardHeader>
        <div className="w-2/3 h-4 rounded-full bg-gray-300 animate-pulse delay-100"  />
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="w-full h-3 rounded-full bg-gray-300 animate-pulse delay-150"  />
        <div className="w-full h-3 rounded-full bg-gray-300 animate-pulse delay-200"  />
        <div className="w-1/2 h-3 rounded-full bg-gray-300 animate-pulse delay-300"  />
      </CardContent>
    </Card>
  );
}

export default ProductSkeleton;
