import { NextResponse } from "next/server";
import prisma from "../../../db/dbconfig";
import { getServerSession } from "next-auth";
export async function addProduct(request) {
      const session=await getServerSession();
  try {
    const { name, description, price, category, stock, ImagePath } = await request.json();
    console.log(name, description, price, category);

    const user=await prisma.user.findFirst({
      where:{
            email:session?.user?.email
      }
    })
    
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price:parseInt(price),
        category,
        stock,
        ImagePath,
        sellerId: user.id
      },
    });

    if (product) {
      return NextResponse.json(
        { success: true, message: "Product added Successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Product Insertion Failed " },
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

export { addProduct as POST };
