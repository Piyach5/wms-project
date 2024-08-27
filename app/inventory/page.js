"use client";

import SideBar from "@/components/SideBar";
import useFetch from "@/hooks/useFetch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Inventory() {
  const { data, error, loading } = useFetch("/inventory/api/items");

  const options = [{ option: "create new item", href: "/" }];

  return (
    <main className="flex flex-row">
      <SideBar options={options} />
      <div className="w-screen flex flex-col px-20 py-10 bg-secondary">
        <h2 className="text-secondary-foreground text-center font-secondary font-extrabold">
          Item List
        </h2>
        {loading || data == null ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>TITLE</TableHead>
                <TableHead>UPC</TableHead>
                <TableHead>QUANTITY</TableHead>
                <TableHead>PRICE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  className="cursor-pointer"
                  key={item.id}
                  onClick={() =>
                    window.location.replace(`/inventory/${item.id}`)
                  }
                >
                  <TableCell className="">{item.title}</TableCell>
                  <TableCell>{item.upc}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
}

export default Inventory;
