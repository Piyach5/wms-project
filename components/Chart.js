import { Chart } from "react-google-charts";

export default function GoogleChart(items) {
  const itemData = [["Items", "Quantity"]];

  items.data.map((item) => itemData.push([item.title, Number(item.quantity)]));

  const options = {
    title: "Items",
    hAxis: { title: "Item", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "100%", height: "100%" },
  };

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="300px"
      data={itemData}
      options={options}
    />
  );
}
