import prisma from "../../../db/dbconfig"
import { NextResponse } from "next/server";

export async function getProduct(request){

      const params=request.nextUrl.searchParams
      const id=params.get('id')
      console.log(id)
      try {
            const product=await prisma.product.findFirst({
                  where:{
                        id
                  }
            })
            if(product){
                  return NextResponse.json(
                        { success: true, message: " Got A Product", product},
                        { status: 200 }
                      );
            }

            return NextResponse.json(
                  { success: false, message: " NO products"},
                  { status: 200 }
                );
      } catch (error) {
            return NextResponse.json(
                  { success: false, message: error.message},
                  { status: 500 }
                );
      }
}

export {getProduct as GET}