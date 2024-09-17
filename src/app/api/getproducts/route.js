import { NextResponse } from "next/server";
import prisma from '../../../db/dbconfig';

export async function GET() {
    try {
        const products = await prisma.product.findMany();
        
        console.log("Fetched Products:", products);

        if (products.length > 0) {
            return NextResponse.json(
                { success: true, message: "Products fetched successfully", products },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: "No products found" },
                { status: 404 } // Changed to 404 for "Not Found"
            );
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
