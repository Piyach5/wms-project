"use client";

import SideBar from "@/components/SideBar";
import useFetch from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Order({ params }) {
  const [isClick, setIsClick] = useState(false);

  const { data, error, loading } = useFetch(`/api/orders/${params.id}`);

  const options = [{ option: "create new order", href: "/createItem" }];

  return (
    <main className="flex flex-row">
      <SideBar options={options} />
      <div className="w-full flex flex-col px-20 py-10 bg-secondary">
        {data &&
          data[1].map((item, index) => (
            <>
              <div className="flex flex-row justify-start items-center gap-5 mb-5">
                <Button onClick={() => window.location.replace("/orders")}>
                  BACK
                </Button>
                <h2 className="text-secondary-foreground text-left font-secondary font-extrabold">
                  Order Number {params.id}
                </h2>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-5 py-5" key={index}>
                  <h3 className="text-secondary-foreground text-left font-secondary text-slate-500 font-extrabold">
                    Receiver: {item.receiver}
                  </h3>
                  <h3 className="text-secondary-foreground text-left font-secondary text-slate-500 font-extrabold">
                    Address: {item.address}
                  </h3>
                  <h3 className="text-secondary-foreground text-left font-secondary text-slate-500 font-extrabold">
                    Phone Number: {item.phone_number}
                  </h3>
                  <h3 className="text-secondary-foreground text-left font-secondary text-slate-500 font-extrabold">
                    Email: {item.email}
                  </h3>
                </div>
                <div className="flex flex-row gap-5">
                  <Button onClick={() => setIsClick(!isClick)}>
                    UPDATE ORDER
                  </Button>
                  <Button onClick={() => deleteItem()}>DELETE ORDER</Button>
                </div>
              </div>
            </>
          ))}
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
        ) : isClick ? (
          <div></div>
        ) : (
          data[0].map((item, index) => (
            <div className="flex flex-col gap-5 py-5" key={index}>
              <span className="font-semibold">{item.title}</span>
              <span>Order Quantity: {item.quantity}</span>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
