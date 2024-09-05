"use client";

import SideBar from "@/components/SideBar";

export default function Orders() {
  const options = [{ option: "create new item", href: "/" }];

  return (
    <main className="flex flex-row">
      <SideBar options={options} />
      <div className="w-screen flex flex-col px-20 py-10 bg-secondary">
        <h2 className="text-secondary-foreground text-left font-secondary font-extrabold mb-10">
          Orders
        </h2>
      </div>
    </main>
  );
}
