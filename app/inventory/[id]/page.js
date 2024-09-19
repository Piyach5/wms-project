"use client";

import SideBar from "@/components/SideBar";
import useFetch from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import UpdateItem from "@/components/UpdateItemForm";
import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Item({ params }) {
  const [isClick, setIsClick] = useState(false);

  const { data, error, loading } = useFetch(`/api/items/${params.id}`);

  const options = [{ option: "create new item", href: "/createItem" }];

  const deleteItem = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/items/${params.id}`);
      toast.success("Item Deleted!");
      setTimeout(() => window.location.replace("/inventory"), 3000);
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  return (
    <main className="flex flex-row">
      <ToastContainer />
      <SideBar options={options} />
      <div className="w-full flex flex-col px-20 py-10 bg-secondary">
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
          <div>
            <div className="flex flex-row justify-start items-center gap-5 mb-10">
              <Button onClick={() => setIsClick(!isClick)}>Back</Button>
              <h2 className="text-secondary-foreground text-left font-secondary font-extrabold">
                Update Item
              </h2>
            </div>
            <UpdateItem data={data} />
          </div>
        ) : (
          data.map((item, index) => (
            <div className="flex flex-col gap-5" key={index}>
              <div className="flex flex-row justify-start items-center gap-5 mb-5">
                <Button onClick={() => window.location.replace("/inventory")}>
                  BACK
                </Button>
                <h2 className="text-secondary-foreground text-left font-secondary font-extrabold">
                  {item.title}
                </h2>
              </div>
              <div className="flex flex-row justify-between">
                <img
                  src={item.image}
                  alt="product image"
                  className="w-[250px] h-[250px]"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="flex flex-row justify-between">
                      <span>UPC</span>
                      {item.upc}
                    </p>
                    <p className="flex flex-row justify-between">
                      <span>QUANTITY</span>
                      {item.quantity}
                    </p>
                    <p className="flex flex-row justify-between">
                      <span>PRICE</span>${item.price}
                    </p>
                  </div>
                  <div className="flex flex-row gap-5">
                    <Button onClick={() => setIsClick(!isClick)}>
                      UPDATE ITEM
                    </Button>
                    <Button onClick={() => deleteItem()}>DELETE ITEM</Button>
                  </div>
                </div>
              </div>
              <p>{item.description}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
