import { NextResponse } from "next/server";
import prisma from "../../../db/dbconfig";

async function isSeller(request) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    const seller = await prisma.seller.findFirst({
      where: {
        id,
      },
    });
    const user=await prisma.user.findFirst({
      where:{
            id:seller.userId
      }
    })
    console.log(user)
    const updatedSeller={...seller, image:user.image}

    const products = await prisma.product.findMany({
      where: {
        sellerId: seller.userId,
      },
    });
    if (seller) {
      return NextResponse.json(
        { success: true, seller:updatedSeller, products },
        { status: 200 }
      );
    }
    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something is wrong" },
      { status: 200 }
    );
  }
}

export { isSeller as GET };
