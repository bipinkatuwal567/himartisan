import prisma from "../../../db/dbconfig"
import { NextResponse } from "next/server";

async function getmycart(request){
      
      try {
            const params=request.nextUrl.searchParams
            const email=params.get('email')
            console.log(email)
            const user=await prisma.buyer.findFirst({
                  where:{email}
            })

            const orders= await prisma.cart.findMany({
                  where: {
                        userId:user.id
                  }
            })
            const productsIds=orders.map(order=>order.productId)
            if(productsIds.length==0){
                  return NextResponse.json(
                        { success: true, message: " NO products"},
                        { status: 200 }
                      );
            }

            const products=await prisma.product.findMany({
                  where: {
                        id:{
                              in: productsIds
                        }
                  }
            })

            if(products){
                  return NextResponse.json(
                        { success: true, message: "Got products ",products },
                        { status: 200 }
                      );
            }

           
            return NextResponse.json(
                  { success: false, message: "Failed to fetch cart " },
                  { status: 400 }
                );

      } catch (error) {
            return NextResponse.json(
                  { success: false, message: error.message },
                  { status: 500 }
                );
      }
}

export{getmycart as GET}