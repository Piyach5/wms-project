"use client";

import SideBar from "@/components/SideBar";
import useFetch from "@/hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import OrderList from "@/components/OrderList";

export default function Orders() {
  const { data, error, loading } = useFetch("/api/orders");

  const options = [{ option: "create new order", href: "/createOrder" }];

  return (
    <main className="flex flex-row">
      <SideBar options={options} />
      <div className="w-screen flex flex-col px-20 py-10 bg-secondary">
        <h2 className="text-secondary-foreground text-left font-secondary font-extrabold">
          Order List
        </h2>
        {loading || data == null ? (
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
        ) : error ? (
          <p>Error</p>
        ) : (
          <OrderList data={data} />
        )}
      </div>
    </main>
  );
}
