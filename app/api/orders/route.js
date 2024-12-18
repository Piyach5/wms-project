import connectionPool from "@/utils/db";

export async function GET(request) {
  try {
    const result = await connectionPool.query(
      `SELECT * FROM orders ORDER BY created_at DESC`
    );
    return Response.json({
      message: "Data Read Successfully",
      data: result.rows,
    });
  } catch (err) {
    return Response.json({ message: err.message });
  }
}

export async function PUT(request) {
  const body = await request.json();
  console.log(body.id);
  try {
    const result = await connectionPool.query(
      `UPDATE orders
       SET is_completed = true
       WHERE orders.id = $1`,
      [body.id]
    );
    return Response.json({
      message: "Data Update Successfully",
      data: result.rows,
    });
  } catch (err) {
    return Response.json({ message: err.message });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const items = JSON.parse(formData.get("items"));

    if (!items[0]) {
      return Response.json(
        { message: "Item has not been added" },
        { status: 400 }
      );
    }

    const result = await connectionPool.query(
      `INSERT INTO orders (receiver, address, phone_number, email)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
      [
        formData.get("receiver"),
        formData.get("address"),
        formData.get("phone_number"),
        formData.get("email"),
      ]
    );

    const orderId = result.rows[0].id;

    for (const item of items) {
      await connectionPool.query(
        `INSERT INTO order_details (order_id, item_id, quantity)
         VALUES ($1, $2, $3)`,
        [orderId, item.item, item.quantity]
      );
    }

    return Response.json(
      { message: "Data Created Successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err.message });
  }
}
