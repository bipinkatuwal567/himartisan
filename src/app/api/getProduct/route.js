import prisma from "../../../db/dbconfig";
import { NextResponse } from "next/server";

// Handler for GET requests
export async function GET(request) {
  // Extract the query parameters from the URL
  const params = request.nextUrl.searchParams;
  const id = params.get('id');
  console.log("Requested ID:", id);

  try {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    console.log("Fetched Product:", product);

    if (product) {
      const seller = await prisma.seller.findFirst({
        where: {
          userId: product.sellerId,
        },
      });

      console.log("Fetched Seller:", seller);

      return NextResponse.json(
        { success: true, message: "Got a Product", product, seller },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "No products found" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
