import { NextResponse } from "next/server";
import prisma from '../../../db/dbconfig';

async function getSales(request){
      const {email}=await request.json();
      console.log(email)
      const seller = await prisma.seller.findFirst({
            where:{email}
      })

      console.log(seller)
      try {
            const sales=await prisma.sales.findMany({
                  where:{
                        seller: seller.id
                  }

            
            })

            console.log(sales)
            const userIds=sales.map(sale=>sale.buyer)
            console.log(userIds)

            const buyers=await prisma.buyer.findMany({
                  where: {
                        id:{
                              in: userIds
                        }
                  }
            })

            const productsIds=sales.map(sale=>sale.productId)
            console.log(productsIds)

            const products=await prisma.product.findMany({
                  where: {
                        id:{
                              in: productsIds
                        }
                  }
            })
            console.log(products)

            let totalSales = 0;
            for (const product of products) {
              totalSales += product.price;
            }

            console.log(totalSales)

            if(sales.length>0){
                  return NextResponse.json({success: true, message:"Got Sales", sales, buyers, products, totalSales}, {status:200})

            }

            return NextResponse.json({success: false, message:"No sales"}, {status:200})
      } catch (error) {
            console.log(`Sales ${error.message}`)
            return NextResponse.json({success: false, message:"something went wrong"}, {status:500})
      }
}

export {getSales as POST}