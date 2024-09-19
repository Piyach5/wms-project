import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const categories = [
  "Miscellaneous",
  "Clothings",
  "Shoes",
  "Watches",
  "Electronics",
  "Musical Instruments",
];

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(500, { message: "Title can't exceed 500 characters" }),
  upc: z.string().length(12, { message: "UPC must be exactly 12 characters" }),
  category: z.enum(categories, { message: "Category is required" }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters" })
    .max(1500, { message: "Description can't exceed 1500 characters" }),
  quantity: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(0, { message: "Quantity must be at least 0" })
      .max(9999, { message: "Quantity can't exceed 9999" })
  ),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(0, { message: "Price must be at least 0" })
      .max(9999, { message: "Price can't exceed 9999" })
  ),
  image: z.preprocess(
    (value) => (value instanceof File ? value : undefined),
    z.instanceof(File, { message: "Please select a valid image file" })
  ),
});

export default function CreateItemForm() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      upc: "",
      category: categories[0],
      description: "",
      quantity: "",
      price: "",
      image: null,
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("https://easywarehouse.vercel.app/api/items", values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Item Created!");
      setLoading(false);
      setTimeout(() => window.location.replace("/inventory"), 3000);
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <Form {...form}>
      <ToastContainer />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter product title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="upc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UPC</FormLabel>
              <FormControl>
                <Input placeholder="Enter product UPC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Enter product description"
                  {...field}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter product quantity"
                  value={field.value || 0}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter product price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              {previewUrl == null ? (
                <></>
              ) : (
                <img
                  src={previewUrl}
                  alt="Product Image"
                  className="w-[100px] h-[100px]"
                />
              )}
              <FormControl>
                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  placeholder="Select product image"
                  onChange={(e) => {
                    e.preventDefault();
                    field.onChange(e.target.files[0]);
                    const file = e.target.files[0];
                    const url = window.URL.createObjectURL(file);
                    setPreviewUrl(url);
                  }}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
