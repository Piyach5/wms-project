"use client";

import CreateItemForm from "@/components/CreateItemForm";
import SideBar from "@/components/SideBar";

function CreateItem() {
  return (
    <main className="flex flex-row">
      <SideBar />
      <div className="w-screen flex flex-col px-20 py-10 bg-secondary">
        <h2 className="text-secondary-foreground text-left font-secondary font-extrabold mb-10">
          Create Item
        </h2>
        <CreateItemForm />
      </div>
    </main>
  );
}

export default CreateItem;
