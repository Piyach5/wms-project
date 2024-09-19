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
      message: "Data Read Successfully",
      data: [result.rows, receiverInfo.rows],
    });
  } catch (err) {
    return Response.json({ message: err.message });
  }
}

export async function PUT(request, { params }) {
  const orderId = params.id;
  try {
    const formData = await request.formData();

    await connectionPool.query(
      `DELETE FROM order_details WHERE order_id = $1`,
      [orderId]
    );

    const items = JSON.parse(formData.get("items"));

    if (!items[0]) {
      return Response.json(
        { message: "Item has not been added" },
        { status: 400 }
      );
    }

    for (const item of items) {
      await connectionPool.query(
        `INSERT INTO order_details (order_id, item_id, quantity)
         VALUES ($1, $2, $3)`,
        [orderId, item.item, item.quantity]
      );
    }

    await connectionPool.query(
      `UPDATE orders
         SET receiver = $1, 
         address = $2,
         phone_number = $3,
         email = $4
         WHERE id = $5`,
      [
        formData.get("receiver"),
        formData.get("address"),
        formData.get("phone_number"),
        formData.get("email"),
        orderId,
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
