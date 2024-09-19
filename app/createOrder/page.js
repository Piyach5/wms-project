"use client";

import CreateOrderForm from "@/components/CreateOrderForm";
import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";

export default function CreateOrder() {
  return (
    <main className="flex flex-row">
      <SideBar />
      <div className="w-screen flex flex-col px-20 py-10 bg-secondary">
        <div className="flex flex-row justify-start items-center gap-5 mb-10">
          <Button onClick={() => window.location.replace("/orders")}>
            BACK
          </Button>
          <h2 className="text-secondary-foreground text-left font-secondary font-extrabold">
            Create Order
          </h2>
        </div>
        <CreateOrderForm />
      </div>
    </main>
  );
}
