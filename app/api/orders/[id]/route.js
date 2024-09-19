import connectionPool from "@/utils/db";

export async function GET(request, { params }) {
  const orderId = params.id;
  try {
    const result = await connectionPool.query(
      `SELECT *, items.title, order_details.quantity FROM order_details 
       INNER JOIN items ON order_details.item_id = items.id
       WHERE order_details.order_id = $1`,
      [orderId]
    );
    const receiverInfo = await connectionPool.query(
      `SELECT * FROM orders 
       WHERE orders.id = $1`,
      [orderId]
    );
    return Response.json({
      message: "Data Read Succeessfully",
      data: [result.rows, receiverInfo.rows],
    });
  } catch (err) {
    return Response.json({ message: err.message });
  }
}

export async function DELETE(request, { params }) {
  const orderId = params.id;
  try {
    await connectionPool.query(`DELETE FROM orders WHERE id = $1`, [orderId]);
    return Response.json(
      { message: "Data Deleted Successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err.message });
  }
}
