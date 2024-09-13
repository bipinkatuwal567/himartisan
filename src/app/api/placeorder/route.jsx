import { NextResponse } from "next/server";
import prisma from '../../../db/dbconfig';

export async function POST(request) {
    try {
        // Parse the incoming JSON request
        const { email, cart } = await request.json();
        
        // Find the user by email
        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Find the buyer associated with the user
        const buyer = await prisma.buyer.findFirst({
            where: { userId: user.id }
        });

        if (!buyer) {
            return NextResponse.json({ success: false, message: "Buyer not found" }, { status: 404 });
        }

        // Prepare an array of promises for updating products and creating orders
        const updateProductPromises = Object.values(cart).map(async (c) => {
            // Update product stock
            await prisma.product.update({
                where: { id: c.id },
                data: { stock: c.stock - c.qty }
            });

            // Create an order record
            return prisma.order.create({
                data: {
                    userId: buyer.id,
                    pricePaid: c.price,
                    productId: c.id,
                    qty: c.qty
                }
            });
        });

        // Wait for all promises to complete
        const results = await Promise.all(updateProductPromises);

        // Check if all results are valid
        if (results.some(result => !result)) {
            return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Order Placed" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}
