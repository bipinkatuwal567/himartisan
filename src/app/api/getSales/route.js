import { NextResponse } from "next/server";
import prisma from '../../../db/dbconfig';

async function getSales(request){
      const {email}=await request.json();
      const seller = await prisma.seller.findFirst({
            where:{email}
      })
      console.log(seller)

      if(!seller){
            return NextResponse.json({success:false, seller:false, message:"You are not a seller"}, {status:200})
      }
      try {
            const sales=await prisma.sales.findMany({
                  where:{
                        seller: seller.id
                  }

            
            })

            const userIds=sales.map(sale=>sale.buyer)

            const buyers=await prisma.buyer.findMany({
                  where: {
                        id:{
                              in: userIds
                        }
                  }
            })

            const productsIds=sales.map(sale=>sale.productId)

            const products=await prisma.product.findMany({
                  where: {
                        id:{
                              in: productsIds
                        }
                  }
            })

            let totalSales = 0;
            for (const product of products) {
              totalSales += product.price;
            }


            if(sales.length>0){
                  return NextResponse.json({success: true, message:"Got Sales", sales, buyers, products, totalSales}, {status:200})

            }

            return NextResponse.json({success: false, message:"No sales"}, {status:200})
      } catch (error) {
            return NextResponse.json({success: false, message:"something went wrong"}, {status:500})
      }
}

export {getSales as POST}