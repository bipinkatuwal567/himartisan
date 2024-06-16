
import prisma from "../../../db/dbconfig"
import { NextResponse } from "next/server";
async function addSales(request){
      const {buyerEmail, sellerEmail, productId}=await request.json()
      console.log(buyerEmail, sellerEmail, productId)

      try {
      const buyer=await prisma.buyer.findFirst({
            where:{email:buyerEmail}
      })
      console.log(buyer)
      const seller=await prisma.seller.findFirst({
            where:{email:sellerEmail}
      })
      console.log(seller)
            
      const sale=await prisma.sales.create({
            data:{
                  buyer:buyer.id,
                  seller:seller.id,
                  productId,
            }
      })

      if(sale){
            return NextResponse.json(
                  { success: true, message: "Sales Compeleted"},
                  { status: 200 }
                );
      }
      return NextResponse.json(
            { success: false, message: "Sales NOT Compeleted"},
            { status: 200 }
          );

      } catch (error) {
            console.log(error.message);
            return NextResponse.json(
                  { success: false, message: "Sales NOT Compeleted"},
                  { status: 200 }
                );
      }
}

export {addSales as POST}