"use client";

import SideBar from "@/components/SideBar";
import useFetch from "@/hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ItemList from "@/components/ItemList";

export default function Inventory() {
  const { data, error, loading } = useFetch("/api/items");

  const options = [{ option: "create new item", href: "/createItem" }];

  return (
    <main className="flex flex-row">
      <SideBar options={options} />
      <div className="w-screen flex flex-col px-20 py-10 bg-secondary">
        <h2 className="text-secondary-foreground text-left font-secondary font-extrabold">
          Item List
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
          <ItemList data={data} />
        )}
      </div>
    </main>
  );
}
