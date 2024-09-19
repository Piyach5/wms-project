import connectionPool from "@/utils/db";
import { uploadFile } from "@/utils/supabase.config";

export async function GET(request) {
  try {
    const result = await connectionPool.query(
      `SELECT *, items.id FROM items INNER JOIN categories ON categories.id = items.categories`
    );
    return Response.json({
      message: "Data Read Successfully",
      data: result.rows,
    });
  } catch (err) {
    return Response.json({ message: err.message });
  }
}

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
    return Response.json(
      { message: "Data Created Successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err.message });
  }
}
