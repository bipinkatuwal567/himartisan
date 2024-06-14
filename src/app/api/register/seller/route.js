import prisma from "../../../../db/dbconfig";
import { NextResponse } from "next/server";


async function register(request){
      try {
            const {name, email, storeName, contactNo}=await request.json();
            const seller=await prisma.seller.findFirst({where:{
                  email
            }})
            if(seller){
                  return NextResponse.json(
                        { success: false, message: "Seller already Exists" },
                        { status: 400 }
                      );
            }
            const newSeller =await prisma.seller.create({
                  data:{
                        name,
                        email,
                        storeName,
                        contactNo,
                        citizenshipImagePath: "helo",
                        citizenshipImagePath2:"asd"
                  }
            })
            if(newSeller){
                  return NextResponse.json(
                        { success: true, message: "Seller Registered Successfully" },
                        { status: 200 }
                      );
            }
            return NextResponse.json(
                  { success: false, message: "Seller Registered Failed " },
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