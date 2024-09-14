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

export default function OrderList(data) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [input, setInput] = useState(null);

  useEffect(() => {
    const items = input
      ? data.data.filter(
          (item) =>
            item.receiver.toLowerCase().includes(input.toLowerCase()) ||
            item.address.toLowerCase().includes(input)
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
        placeholder="Search by receiver or address"
        onChange={(e) => setInput(e.target.value)}
        className="my-10"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ORDER NUMBER</TableHead>
            <TableHead>RECEIVER</TableHead>
            <TableHead>ADDRESS</TableHead>
            <TableHead>PHONE NUMBER</TableHead>
            <TableHead>EMAIL</TableHead>
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
                  onClick={() => window.location.replace(`/orders/${item.id}`)}
                >
                  <TableCell className="text-center">{item.id}</TableCell>
                  <TableCell>{item.receiver}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>{item.email}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <PaginationComponent />
    </>
  );
}
