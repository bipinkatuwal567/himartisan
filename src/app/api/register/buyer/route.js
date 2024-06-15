const { NextURL } = require("next/dist/server/web/next-url")
import prisma from "../../../../db/dbconfig";
import { NextResponse } from "next/server";

async function register(request){
      try {
            const {name, email,  contactNo}=await request.json();
            
            const buyer=await prisma.buyer.findFirst({where:{
                  email
            }})
            if(buyer){
                  return NextResponse.json(
                        { success: false, message: "Buyer already Exists" },
                        { status: 200 }
                      );
            }
            const newBuyer =await prisma.buyer.create({
                  data:{
                        name,
                        email,
                        contactNo,
                        role:"Buyer"
                  }
            })
            console.log(newBuyer)
            if(newBuyer){
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
            return NextResponse.json(
                  { success: false, message: error.message },
                  { status: 500 }
                );
      }
}

export {register as POST}