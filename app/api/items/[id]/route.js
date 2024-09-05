import connectionPool from "@/utils/db";
import { uploadFile } from "@/utils/supabase.config";

export async function GET(request, { params }) {
  const itemId = params.id;
  try {
    const result = await connectionPool.query(
      `SELECT *, items.id FROM items INNER JOIN categories ON categories.id = items.categories WHERE items.id = $1`,
      [itemId]
    );
    return Response.json({
      message: "Data Read Succeessfully",
      data: result.rows,
    });
  } catch (err) {
    return Response.json({ message: err.message });
  }
}

export async function PUT(request, { params }) {
  const itemId = params.id;
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
      `UPDATE items
         SET title = $1, 
         upc = $2,
         categories = $3,
         image = $4,
         description = $5,
         quantity = $6,
         price = $7
         WHERE id = $8`,
      [
        formData.get("title"),
        formData.get("upc"),
        Number(categoryId.rows[0].id),
        imageUrl.data.publicUrl,
        formData.get("description"),
        Number(formData.get("quantity")),
        parseFloat(formData.get("price")),
        itemId,
      ]
    );
    return Response.json(
      { message: "Data Updated Successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err.message });
  }
}

export async function DELETE(request, { params }) {
  const itemId = params.id;
  try {
    await connectionPool.query(`DELETE FROM items WHERE id = $1`, [itemId]);
    return Response.json(
      { message: "Data Deleted Successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err.message });
  }
}
