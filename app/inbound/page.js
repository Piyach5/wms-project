"use client";

import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

function Inbound() {
  const [upc, setUpc] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const options = [{ option: "create new item", href: "/createItem" }];

  const updateItem = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("http://localhost:3000/inbound/api/receive", data);
      setLoading(false);
      setMessage("Updated successfully");
    } catch {
      setLoading(false);
      setMessage("Item not found");
    }
  };

  return (
    <main className="flex flex-row">
      <SideBar options={options} />
      <div className="w-screen flex flex-col px-20 py-10 bg-secondary">
        <h2 className="text-secondary-foreground text-left font-secondary font-extrabold mb-10">
          Receive Item
        </h2>
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
            RECEIVE
          </Button>
        </div>
        <>
          {loading ? (
            <p className="mt-5 font-bold">Loading...</p>
          ) : (
            <p
              className={
                message === "Updated successfully"
                  ? "text-primary mt-5 font-bold"
                  : "text-red-500 mt-5 font-bold"
              }
            >
              {message}
            </p>
          )}
        </>
      </div>
    </main>
  );
}

export default Inbound;
