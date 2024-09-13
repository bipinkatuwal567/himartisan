import { getServerSession } from "next-auth";
import prisma from "../../../db/dbconfig"
import { NextResponse } from "next/server";

async function getmycart(){
      const session=await getServerSession();
      try {
           
            const user=await prisma.user.findFirst({
                  where:{email:session.user.email}
            })

            const orders= await prisma.cart.findMany({
                  where: {
                        AND: [
                          { userId: user.id },
                          { status: "PURCHASED" }
                        ],
                      },
            })
            console.log(orders)
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

            const updatedProducts = products.map(product => {
                  const order = orders.find(order => order.productId === product.id);
                  if (order) {
                    return {
                      ...product,
                      qty: order.qty,
                      stock:product.stock,
                      purchasedOn:order.purchasedOn,
                      deliveredOn:order.deliveredOn
                    };
                  } else {
                    return product;
                  }
                });

                console.log(updatedProducts)

            if(products){
                  return NextResponse.json(
                        { success: true, message: "Got products ",products:updatedProducts },
                        { status: 200 }
                      );
            }

           
            return NextResponse.json(
                  { success: false, message: "Failed to fetch cart " },
                  { status: 400 }
                );

      } catch (error) {
            console.log(error.message)
            return NextResponse.json(
                  { success: false, message: error.message },
                  { status: 500 }
                );
      }
}

export{getmycart as GET}