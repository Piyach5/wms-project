"use client";

import SideBar from "@/components/SideBar";
import useFetch from "@/hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function CompleteOrder() {
  const [isloading, setIsLoading] = useState(false);
  const { data, error, loading } = useFetch("/api/orders");

  const options = [{ option: "create new order", href: "/createOrder" }];

  const updateOrder = async (id) => {
    setIsLoading(true);
    try {
      await axios.put("https://easywarehouse.vercel.app/api/orders", { id });
      toast.success("Complete order successfully!");
      setTimeout(() => window.location.reload(), 3000);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.respone.data.message);
    }
  };

  return (
    <main className="flex flex-row">
      <ToastContainer />
      <SideBar options={options} />
      <div className="w-screen flex flex-col px-20 py-10 bg-secondary">
        <h2 className="text-secondary-foreground text-left font-secondary font-extrabold mb-10">
          Complete Order
        </h2>
        {loading || data == null || isloading ? (
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
          data
            .filter((item) => !item.is_completed)
            .map((item) => (
              <div className="flex flex-row items-center">
                <p className="min-w-[300px] py-2 font-semibold">
                  Order Number: {item.id}
                </p>

                <Button className="mb-2" onClick={() => updateOrder(item.id)}>
                  COMPLETE ORDER
                </Button>
              </div>
            ))
        )}
      </div>
    </main>
  );
}
