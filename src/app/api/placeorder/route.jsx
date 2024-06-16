import { NextResponse } from "next/server";
import prisma from '../../../db/dbconfig';
import { date } from "zod";

export async function placeOrder(request){
      const {email, cart}=await request.json();
      const carts=JSON.parse(cart)
      const arrayCarts=Object.values(carts)
     try {
      const buyer=await prisma.buyer.findFirst({
            where:{
                  email
            }
      })
      console.log(arrayCarts)
      console.log(typeof arrayCarts);




      if(cart){
            arrayCarts.map(async (c)=>{
                  const product=await prisma.product.update({
                        where:{id:c.id},
                        data:{
                              stock:c.stock-1
                        }
                  })

                  const result=await prisma.order.create({
                        data:{
                              userId: buyer.id,
                              pricePaid:c.price,
                              productId:c.id,
                              // product: { connect: { id: c.id } } 
                        }
                  })
            if(!result){
                  return NextResponse.json({success: false, message:"Something went wrong"}, {status:200})
            }
            })
      }

      return NextResponse.json({success: true, message:"Order Placed"}, {status:200})
     } catch (error) {
            console.log(error)
            return NextResponse.json({success: false, message:"Something went wrong"}, {status:500})

     }
      
}


export {placeOrder as POST}