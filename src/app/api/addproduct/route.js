import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../db/dbconfig';
import { getServerSession } from 'next-auth';

export async function POST(request) {
  const session = await getServerSession();
  
  try {
    const { name, description, price, category, stock, ImagePath } = await request.json();
    console.log(name, description, price, category);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price, 10),
        category,
        stock,
        ImagePath,
        sellerId: user.id,
      },
    });

    return NextResponse.json(
      { success: true, message: "Product added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
