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

    const user=await prisma.User.findFirst({
      where: {
            id:seller.userId
      }
    })

    const finalSeller={
      ...seller,
      image:user.image,
      createdAt:user.createdAt
    }
   

    const products = await prisma.product.findMany({
      where: {
        sellerId: seller.userId,
      },
    });
    console.log(products);

    if (seller) {
      return NextResponse.json(
        { success: true, seller:finalSeller, products },
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
