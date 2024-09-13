import prisma from "../../../db/dbconfig";
import { NextResponse } from "next/server";
async function getReviews(request){
      const params=request.nextUrl.searchParams
      const id=params.get('id')

      try {
            const newReview = await prisma.review.findMany({
               where:{
                  AND:[
                        {productId:id}
                  ]
               }
      })

      const updatedReviewPromises=newReview.map(async (review)=>{
            const user=await prisma.user.findFirst({
                  where:{id:review.userId}
            })
            console.log(user)
            return{
                  ...review,
                  username:user.name,
                  userImage:user.image
            }
      })
      const updatedReview=await Promise.all(updatedReviewPromises)
      console.log(updatedReview)

      if(newReview){
            return NextResponse.json(
                  { success: true, message: "Got the Reviews", reviews:updatedReview},
                  { status: 200 }
                );
      }

      return NextResponse.json(
            { success: false, message: "Failed to get Review"},
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

export {getReviews as GET}