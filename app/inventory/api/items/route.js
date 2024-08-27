import connectionPool from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const result = await connectionPool.query(`SELECT * FROM items`);
    return NextResponse.json({
      message: "Data Read Succeessfully",
      data: result.rows,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
