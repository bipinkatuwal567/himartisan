import { getServerSession } from "next-auth";
import prisma from "../../../db/dbconfig";
import { NextResponse } from "next/server";
async function addtoCart(request){
      const session =await getServerSession()
      const {productId }=await request.json()
      try {
            
            const user=await prisma.user.findFirst({
                  where:{
                        email:session?.user?.email
                  }
            })

            if(user.role==="SELLER"){
                  return NextResponse.json(
                        { success: false, message: "SELLER are not allowed to Buy Goods! " },
                        { status: 200 }
                  );
            }

            const product=await prisma.product.findFirst({
                  where:{id:productId}
            })

            if(!user || ! product)
                  return NextResponse.json(
                        { success: false, message: "Cart Update Failed " },
                        { status: 200 }
                  );
            
            const cart=await prisma.Cart.create({
                  data:{
                        productId:product.id,
                        userId:user.id,
                        qty:1
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
                  { status: 200 }
            );

     } catch (error) {
      console.log(error.message)
      return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
          );
     }
}

export{addtoCart as POST}