"use client";

import SideBar from "@/components/SideBar";
import ItemsChart from "@/components/ItemsChart";
import OrdersChart from "@/components/OrdersChart";
import useFetch from "@/hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Home() {
  const { data: items } = useFetch("/api/items");
  const { data: orders } = useFetch("/api/orders");

  const options = [
    { option: "create new item", href: "/createItem" },
    { option: "create new order", href: "/createOrder" },
  ];
  return (
    <main className="flex flex-row">
      <SideBar options={options} />
      <div className="w-screen flex flex-col p-10 bg-secondary">
        <div className="text-secondary-foreground font-primary font-extrabold uppercase mb-5">
          dashboard
        </div>
        <div>
          {items != null ? (
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="p-5 font-bold text-secondary-foreground">
                  Item Chart
                </h2>
                {items && <ItemsChart items={items} />}
              </div>
              <div className="text-center">
                <h2 className="p-5 font-bold text-left text-secondary-foreground">
                  Order Chart
                </h2>
                {orders && <OrdersChart orders={orders} />}
              </div>
            </div>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                mt: 20,
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </div>
      </div>
    </main>
  );
}
