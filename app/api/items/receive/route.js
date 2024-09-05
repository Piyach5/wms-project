import connectionPool from "@/utils/db";

export async function PUT(request) {
  const itemData = await request.json();
  try {
    const checkUpc = await connectionPool.query(
      `SELECT * FROM items WHERE upc = $1`,
      [itemData.upc]
    );
    if (!checkUpc.rows[0]) {
      return Response.json(
        {
          message: "Item not found",
        },
        { status: 404 }
      );
    } else {
      await connectionPool.query(
        `UPDATE items 
       SET quantity = quantity + $1 
       WHERE upc = $2`,
        [itemData.quantity, itemData.upc]
      );
      return Response.json({
        message: "Data Updated Succeessfully",
      });
    }
  } catch (err) {
    return Response.json({ message: err.message });
  }
}
