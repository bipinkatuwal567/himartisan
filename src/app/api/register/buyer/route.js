const { NextURL } = require("next/dist/server/web/next-url")
import { getServerSession } from "next-auth";
import prisma from "../../../../db/dbconfig";
import { NextResponse } from "next/server";

async function register(request){
      const session=await getServerSession()
      console.log(session);
      try {
            const {contactNo}=await request.json();
            
            const user=await prisma.user.findFirst({
                  where:{
                        email:session.user.email
                  }
            })
            const buyer=await prisma.buyer.findFirst({where:{
                  userId:user.id
            }})
            if(buyer){
                  return NextResponse.json(
                        { success: false, message: "Buyer already Exists" },
                        { status: 200 }
                      );
            }
            const newBuyer =await prisma.buyer.create({
                  data:{
                        userId:user.id,
                        contactNo
                  }
            })
            console.log(newBuyer)
            if(newBuyer){
                  await prisma.user.update({
                        where:{
                              id:user.id
                        }, 
                              data:{
                                    role:"BUYER"
                              }
                        
                  })
                  return NextResponse.json(
                        { success: true, message: "Buyer Registered Successfully" },
                        { status: 200 }
                      );
            }
            return NextResponse.json(
                  { success: false, message: "Buyer Register Failed " },
                  { status: 400 }
                );

      } catch (error) {
            console.log(error)
            return NextResponse.json(
                  { success: false, message: error.message },
                  { status: 500 }
                );
      }
}

export {register as POST}