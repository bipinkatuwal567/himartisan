import { NextResponse } from "next/server";
import prisma from '../../../db/dbconfig';
export async function getProducts(){
    try {
      const products=await prisma.product.findMany();
         

      console.log(products)
      if(products)
            return NextResponse.json({success: true, message:"Product Got Successfully", products}, {status:200})
      return NextResponse.json({success: false, message:"Failed to Get Products"}, {status:400})


    } catch (error) {
      return NextResponse.json({success: false, message:error.message}, {status:500})
      
    }
}

export { getProducts as GET};