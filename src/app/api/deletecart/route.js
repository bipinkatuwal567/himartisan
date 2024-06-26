import { getServerSession } from "next-auth";
import prisma from "../../../db/dbconfig";
import { NextResponse } from "next/server";
async function deleteCart(request){
      const session=await getServerSession()

      const {productId}=await request.json();
      try {

            const user=await prisma.user.findFirst({
                  where:{
                        email:session?.user?.email
                  }
            })
            const deletedProduct = await prisma.cart.deleteMany({
                  where: {
                    productId,
                    userId: user.id
                  }
      })
      if(deletedProduct){
            return NextResponse.json(
                  { success: true, message: "Deleted"},
                  { status: 200 }
                );
      }

      return NextResponse.json(
            { success: false, message: "Not Deleted"},
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

export {deleteCart as POST}