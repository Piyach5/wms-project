"use client";

import SideBar from "@/components/SideBar";
import GoogleChart from "@/components/Chart";
import useFetch from "@/hooks/useFetch";

export default function Home() {
  const { data: items } = useFetch("/inventory/api/items");

  const options = [
    { option: "inbound", href: "/" },
    { option: "inventory", href: "/" },
    { option: "outbound", href: "/" },
  ];
  return (
    <main className="flex flex-row">
      <SideBar options={options} />
      <div className="w-screen flex flex-col p-10 bg-secondary">
        <div className="text-secondary-foreground font-primary font-extrabold uppercase mb-5">
          dashboard
        </div>
        <div>
          {items != null ? <GoogleChart data={items} /> : <p>Loading...</p>}
        </div>
      </div>
    </main>
  );
}
