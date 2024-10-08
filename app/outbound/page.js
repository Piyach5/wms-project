"use client";

import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Outbound() {
  const [upc, setUpc] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [loading, setLoading] = useState(false);

  const options = [
    { option: "complete order", href: "/outbound/completeOrder" },
  ];

  const updateItem = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("https://easywarehouse.vercel.app/api/items/pick", data);
      setLoading(false);
      toast.success("Pick up item(s) successfully");
    } catch (err) {
      if (err.status === 400) {
        setLoading(false);
        toast.error("Out of Stock!");
      } else {
        setLoading(false);
        toast.error("Item not found or missing data!");
      }
    }
  };

  return (
    <main className="flex flex-row">
      <ToastContainer />
      <SideBar options={options} />
      <div className="w-screen flex flex-col px-20 py-10 bg-secondary">
        <h2 className="text-secondary-foreground text-left font-secondary font-extrabold mb-10">
          Pick Up Item
        </h2>
        {loading ? (
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
        ) : (
          <div className="flex flex-row gap-5">
            <Input
              type="text"
              placeholder="UPC NUMBER"
              onChange={(e) => setUpc(e.target.value)}
            />
            <Input
              type="number"
              placeholder="QUANTITY"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Button
              type="submit"
              onClick={(e) => updateItem(e, { upc, quantity })}
            >
              Pick Up
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
