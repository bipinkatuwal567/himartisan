import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
function ProductSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse w-auto h-96  sm:h-72">
      <div className="w-full h-48  bg-gray-300" />
      <CardHeader>
        <div className="w-2/3 h-4 rounded-full bg-gray-300" />
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="w-full h-3 rounded-full bg-gray-300" />
        <div className="w-full h-3 rounded-full bg-gray-300" />
        <div className="w-1/2 h-3 rounded-full bg-gray-300" />
      </CardContent>
    </Card>
  );
}

export default ProductSkeleton;
