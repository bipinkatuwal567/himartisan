import { NextResponse } from "next/server";
import prisma from '../../../db/dbconfig';
import { date } from "zod";

export async function placeOrder(request){
      const {email, cart}=await request.json();
 
      console.log( typeof Object.values(cart))

     
     try {
      const user=await prisma.user.findFirst({
            where:{
                  email
            }
      })
      const buyer=await prisma.buyer.findFirst({
            where:{
                  userId:user.id
            }
      })

      Object.values(cart).map(async (c)=>{
            await prisma.product.update({
                  where:{id:c.id},
                  data:{
                        stock:c.stock-c.qty
                  }
            })

            const result=await prisma.order.create({
                  data:{
                        userId: buyer.id,
                        pricePaid:c.price,
                        productId:c.id,
                        qty:c.qty
                        // product: { connect: { id: c.id } } 
                  }
            })
            if(!result){
                  return NextResponse.json({success: false, message:"Something went wrong"}, {status:200})
            }
      })


   

      return NextResponse.json({success: true, message:"Order Placed"}, {status:200})
     } catch (error) {
            console.log(error)
            return NextResponse.json({success: false, message:"Something went wrong"}, {status:500})

     }
      
}


export {placeOrder as POST}