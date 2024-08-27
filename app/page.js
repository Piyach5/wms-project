"use client";

import SideBar from "@/components/SideBar";

export default function Home() {
  const options = [
    { option: "inbound", href: "/" },
    { option: "inventory", href: "/" },
    { option: "outbound", href: "/" },
  ];
  return (
    <main className="flex flex-row">
      <SideBar options={options} />
      <div className="w-screen flex flex-col p-10 bg-secondary">
        <div className="text-secondary-foreground font-primary uppercase">
          dashboard
        </div>
      </div>
    </main>
  );
}
