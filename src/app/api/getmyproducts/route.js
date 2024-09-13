import { NextResponse } from 'next/server';
import prisma from '../../../db/dbconfig';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    const products = await prisma.product.findMany({
      where: {
        email: email, // Adjust based on your actual schema
      },
    });

    console.log(products);
    
    if (products.length > 0) {
      return NextResponse.json(
        { success: true, message: "Products retrieved successfully", products },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "No products found" },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
