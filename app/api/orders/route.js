import connectionPool from "@/utils/db";

export async function GET(request) {
  try {
    const result = await connectionPool.query(`SELECT * FROM orders`);
    return Response.json({
      message: "Data Read Succeessfully",
      data: result.rows,
    });
  } catch (err) {
    return Response.json({ message: err.message });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
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

    const items = JSON.parse(formData.get("items"));

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
