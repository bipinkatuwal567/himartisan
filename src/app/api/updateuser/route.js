import { NextResponse } from "next/server";
import prisma from '../../../db/dbconfig';
async function updateUser(request){
      const {name, email}=await request.json();
      try {
      
      // Update the user's name
      const updatedUser = await prisma.seller.update({
            where: {
              email: email,
            },
            data: {
              name: name,
            },
          });
      if(updatedUser){
            return NextResponse.json(
                  { success: true, message: " Updated Sucessfully"},
                  { status: 200 }
                );
      }
      return NextResponse.json(
            { success: false, message: " Update Failed"},
            { status: 200 }
          );
      } catch (error) {
            console.log(error)
            return NextResponse.json(
                  { success: true, message: " Updated Sucessfully"},
                  { status: 500 }
                );
      }
}

export {updateUser as POST}