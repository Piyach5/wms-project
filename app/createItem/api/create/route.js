import connectionPool from "@/utils/db";
import { NextResponse } from "next/server";
import { uploadFile } from "@/utils/supabase.config";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageUrl = await uploadFile(
      formData.get("image"),
      formData.get("upc")
    );
    const categoryId = await connectionPool.query(
      `SELECT id FROM categories WHERE category = $1`,
      [formData.get("category")]
    );
    await connectionPool.query(
      `INSERT INTO items (title, upc, categories, image, description, quantity, price)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        formData.get("title"),
        formData.get("upc"),
        Number(categoryId.rows[0].id),
        imageUrl.data.publicUrl,
        formData.get("description"),
        Number(formData.get("quantity")),
        parseFloat(formData.get("price")),
      ]
    );
    return NextResponse.json(
      { message: "Data Created Successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }
}
