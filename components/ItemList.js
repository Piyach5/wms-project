import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

export default function ItemList(data) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [input, setInput] = useState(null);

  useEffect(() => {
    const items = input
      ? data.data.filter(
          (item) =>
            item.title.toLowerCase().includes(input.toLowerCase()) ||
            item.upc.toLowerCase().includes(input)
        )
      : data.data;
    setItems(items);
    setPage(1);
  }, [input]);

  const PaginationComponent = () => {
    const totalPageArray = [];
    const totalPageSize = Math.ceil(items.length / 5);
    for (let i = 1; i <= totalPageSize; i++) {
      totalPageArray.push(i);
    }
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => (page == 1 ? page : setPage(page - 1))}
            />
          </PaginationItem>
          <PaginationItem>
            {totalPageArray.map((item) => (
              <PaginationLink key={item} isActive onClick={() => setPage(item)}>
                {item}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => (page == totalPageSize ? page : setPage(page + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Search by title or UPC number"
        onChange={(e) => setInput(e.target.value)}
        className="my-10"
      />
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
          {page &&
            items
              .filter(
                (item, index) => index >= page * 5 - 5 && index < page * 5
              )
              .map((item) => (
                <TableRow
                  className="cursor-pointer"
                  key={item.id}
                  onClick={() =>
                    window.location.replace(`/inventory/${item.id}`)
                  }
                >
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.upc}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <PaginationComponent />
    </>
  );
}
