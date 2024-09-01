import connectionPool from "@/utils/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const itemData = await request.json();
  try {
    const checkUpc = await connectionPool.query(
      `SELECT * FROM items WHERE upc = $1`,
      [itemData.upc]
    );

    console.log(checkUpc.rows[0]);
    if (!checkUpc.rows[0]) {
      return NextResponse.json(
        {
          message: "Item not found",
        },
        { status: 404 }
      );
    } else if (checkUpc.rows[0]["quantity"] <= 0) {
      return NextResponse.json(
        {
          message: "Out of Stock",
        },
        { status: 400 }
      );
    } else {
      await connectionPool.query(
        `UPDATE items 
       SET quantity = quantity - $1 
       WHERE upc = $2`,
        [itemData.quantity, itemData.upc]
      );
      return NextResponse.json({
        message: "Data Updated Succeessfully",
      });
    }
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
