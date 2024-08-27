"use client";

import SideBar from "@/components/SideBar";
import useFetch from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";

function Item({ params }) {
  const { data, error, loading } = useFetch(
    `/inventory/api/items/${params.id}`
  );

  const options = [{ option: "create new item", href: "/" }];

  return loading || data == null ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error</p>
  ) : (
    <main className="flex flex-row">
      <SideBar options={options} />
      <div className="w-full flex flex-col px-20 py-10 bg-secondary">
        {data.map((item) => (
          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between gap-5">
              <Button onClick={() => window.location.replace("/inventory")}>
                BACK
              </Button>
              <h2 className="text-secondary-foreground text-left font-secondary font-extrabold mb-5">
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
                  <Button>UPDATE ITEM</Button>
                  <Button>DELETE ITEM</Button>
                </div>
              </div>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Item;
