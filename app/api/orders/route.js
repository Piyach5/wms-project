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
