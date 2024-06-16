import { NextResponse } from "next/server";
import prisma from '../../../db/dbconfig';


async function isSeller(request){
      const {email}=await request.json()
      try {
            const seller=await prisma.seller.findFirst({
                  where:{
                        email
                  }
            })

            if(seller){
                  return NextResponse.json({seller:true},{status:200})
            }
            return NextResponse.json({seller:false},{status:200})

      } catch (error) {
            return NextResponse.json({seller:false, message:"Something is wrong"},{status:200})
            
      }
}

export {isSeller as POST}