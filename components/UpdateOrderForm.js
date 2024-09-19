import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useFetch from "@/hooks/useFetch";

const formSchema = z.object({
  receiver: z
    .string()
    .min(2, { message: "Receiver must be at least 2 characters" })
    .max(100, { message: "Receiver can't exceed 100 characters" }),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters" })
    .max(1500, { message: "Address can't exceed 1500 characters" }),
  phone_number: z
    .string()
    .regex(/^[\d\s\-\(\)\.]{9,15}$/, {
      message: "Invalid phone number format",
    })
    .refine((val) => val.match(/\d/g)?.length >= 9, {
      message: "Phone number must contain at least 9 digits",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  items: z.array(
    z.object({
      item: z.preprocess(
        (val) => Number(val),
        z.number().min(1, { message: "(Item must be selected)" })
      ),
      quantity: z.preprocess(
        (val) => Number(val),
        z.number().min(1, { message: "(Must be at least 1)" })
      ),
    })
  ),
});

export default function UpdateOrder(data) {
  const [loading, setLoading] = useState(false);

  const { id, receiver, address, phone_number, email } = data.data[1][0];

  const { data: items } = useFetch("/api/items");

  const orderItems = [];

  data.data[0].map((item) =>
    orderItems.push({ item: item.item_id, quantity: item.quantity })
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver: receiver,
      address: address,
      phone_number: phone_number,
      email: email,
      items: orderItems,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = async (values) => {
    setLoading(true);

    const formData = new FormData();

    formData.append("receiver", values.receiver);
    formData.append("address", values.address);
    formData.append("phone_number", values.phone_number);
    formData.append("email", values.email);
    formData.append("items", JSON.stringify(values.items));

    try {
      await axios.put(
        `https://easywarehouse.vercel.app/api/orders/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Order Updated!");
      setLoading(false);
      setTimeout(() => window.location.replace(`/orders/${id}`), 3000);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };

  return (
    <Form {...form}>
      <ToastContainer />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="receiver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receiver</FormLabel>
              <FormControl>
                <Input placeholder="Enter receiver's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Enter receiver's address"
                  {...field}
                  className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter receiver's phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter receiver's email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row items-end space-x-4">
            <FormField
              control={form.control}
              name={`items.${index}.item`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-10">
                    <FormLabel>Item</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <select
                      {...field}
                      className="block w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {items?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`items.${index}.quantity`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-10">
                    <FormLabel>Quantity</FormLabel>
                    <FormMessage className="truncate" />
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="button" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ item: "", quantity: "1" })}
          className="block"
        >
          Add Item
        </Button>
        {loading ? (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}
