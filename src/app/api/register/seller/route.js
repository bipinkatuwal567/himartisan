import prisma from "../../../../db/dbconfig";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";


async function register(request){
      const session=await getServerSession()
      try {
            const { storeName, contactNo, storeAddress, storeDescription}=await request.json();
            
            const user=await prisma.user.findFirst({
                  where:{
                        email:session.user.email
                  }
            })
            const seller=await prisma.seller.findFirst({where:{
                  id:user.id
            }})
            if(seller){
                  return NextResponse.json(
                        { success: false, message: "Seller already Exists" },
                        { status: 200 }
                      );
            }
            const newSeller =await prisma.seller.create({
                  data:{
                        userId:user.id,
                        storeName,
                        contactNo,
                        storeAddress,
                        storeDescription
                  }
            })
            if(newSeller){
                  await prisma.user.update({
                        where:{
                              id:user.id
                        }, 
                              data:{
                                    role:"SELLER"
                              }
                        
                  })
                  return NextResponse.json(
                        { success: true, message: "Seller Registered Successfully" },
                        { status: 200 }
                      );
            }
            return NextResponse.json(
                  { success: false, message: "Seller Registered Failed " },
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

export {register as POST}