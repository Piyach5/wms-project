"use client";

import SideBar from "@/components/SideBar";
import useFetch from "@/hooks/useFetch";

function Inbound() {
  const { data, error, loading } = useFetch("/inventory/api/items");

  const options = [{ option: "create new item", href: "/" }];

  return loading || data == null ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error</p>
  ) : (
    <main className="flex flex-row">
      <SideBar options={options} />
      <div className="flex flex-col px-20 py-10 bg-secondary">
        <h2 className="text-secondary-foreground text-center font-secondary font-extrabold">
          Receive Item
        </h2>
      </div>
    </main>
  );
}

export default Inbound;
