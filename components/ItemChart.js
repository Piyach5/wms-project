import { Chart } from "react-google-charts";

export default function ItemChart(items) {
  const itemData = [["Items", "Quantity"]];

  items.items.map((item) => itemData.push([item.title, Number(item.quantity)]));

  const options = {
    chartArea: { width: "100%", height: "80%" },
  };

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="100%"
      data={itemData}
      options={options}
    />
  );
}
