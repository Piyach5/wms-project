import connectionPool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const itemId = params.id;
  try {
    const result = await connectionPool.query(
      `SELECT * FROM items WHERE items.id = $1`,
      [itemId]
    );
    return NextResponse.json({
      message: "Data Read Succeessfully",
      data: result.rows,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
