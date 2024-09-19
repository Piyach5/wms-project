import { Chart } from "react-google-charts";

export default function OrdersChart(orders) {
  const orderData = [
    ["Order Number", "Receiver", "Phone Number", "Created Date"],
  ];

  orders.orders.map((item) => {
    const createdDate = new Date(item.created_at);
    orderData.push([
      item.id,
      item.receiver,
      item.phone_number,
      createdDate.toLocaleString("en-GB", { timeZone: "UTC" }),
    ]);
  });

  const options = {
    chartArea: { width: "100%", height: "100%" },
  };

  return (
    <Chart
      chartType="Table"
      width="100%"
      height="100%"
      data={orderData}
      options={options}
    />
  );
}
