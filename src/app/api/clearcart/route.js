import { getServerSession } from "next-auth";
import prisma from "../../../db/dbconfig";
import { NextResponse } from "next/server";
async function deleteCart(request){
      const session=await getServerSession()
      try {

            const user=await prisma.user.findFirst({
                  where:{
                        email:session?.user?.email
                  }
            })
            const currentDate = new Date();
            const deliveredOn = new Date(currentDate);
            deliveredOn.setDate(currentDate.getDate() + 1);
            const deletedProducts = await prisma.cart.updateMany({
                  where: {
                        AND: [
                          { userId: user.id },
                          { status: "" }
                        ],
                      },
                  data:{
                        status:"PURCHASED",
                        purchasedOn:currentDate,
                        deliveredOn:deliveredOn
                  }
      })
      if(deletedProducts){
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