import prisma from "../../../db/dbconfig";
import { NextResponse } from "next/server";
async function addtoCart(request){
      const {email, productId}=await request.json()
     try {

      const product=await prisma.product.findFirst({
            where:{email}
      })

      const user=await prisma.buyer.findFirst({
            where:{id:productId}
      })

      if(!product || !user)
            return NextResponse.json(
                  { success: false, message: "Cart Update Failed " },
                  { status: 400 }
                );
      
      const cart=await prisma.Cart.create({
            data:{
                  productId:product.id,
                  userId:user.id,
                  // product:product,
                  // user:user
            }
      })

      console.log(cart)
      
      if(cart){
            return NextResponse.json(
                  { success: true, message: "Cart Updated Successfully" },
                  { status: 200 }
                );
      }

      return NextResponse.json(
            { success: false, message: "Cart Update Failed " },
            { status: 400 }
          );

     } catch (error) {
      return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
          );
     }
}

export{addtoCart as POST}