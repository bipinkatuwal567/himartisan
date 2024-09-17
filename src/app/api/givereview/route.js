import { getServerSession } from "next-auth";
import prisma from "../../../db/dbconfig";
import { NextResponse } from "next/server";
async function deleteCart(request){
      const session=await getServerSession()

      const {productId, rating, review}=await request.json();
      try {

            const user=await prisma.user.findFirst({
                  where:{
                        email:session?.user?.email
                  }
            })

            const oldReview=await prisma.review.findFirst({
                  where:{
                        AND:[
                              {productId:productId},
                              {userId:user.id},
                        ]
                  }
            })

            if(oldReview)
                  return NextResponse.json(
                        { success: false, message: "Your Have already reviewed this Product"},
                        { status: 200 }
                      );

            const newReview = await prisma.review.create({
               data:{
                  userId:user.id,
                  productId:productId,
                  rating,
                  review
               }
      })

      if(newReview){
            return NextResponse.json(
                  { success: true, message: "Review Submitted"},
                  { status: 200 }
                );
      }

      return NextResponse.json(
            { success: false, message: "Failed to Submit Review"},
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

export {deleteCart as POST}