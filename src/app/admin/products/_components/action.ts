"use server";

import { z } from "zod";
import fs from "fs/promises";
import { query } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

const fileSchems = z.instanceof(File, { message: "file is required" });
const imageSchema = fileSchems.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);
const addSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export const addProduct = async (prevState: unknown, formData: FormData) => {
  const result = addSchema.safeParse(
    Object.fromEntries(formData.entries())
  ) as any;
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;
  await fs.mkdir("public/products", { recursive: true });
  const image = data.image.name;
  const filePath = `public/products/${crypto.randomUUID()}-${image}`;
  await fs.writeFile(filePath, Buffer.from(await data.image.arrayBuffer()));
  const res = await query({
    query: "INSERT INTO products (name, price, image) VALUES (?, ?, ?)",
    values: [data.name, data.price, filePath],
  });
  redirect("/admin/products/milk");
};

export const getProducts = async (offset: number, limit: number) => {
  console.log(offset, limit);
  const res = await query({
    query: `SELECT * FROM products limit ${limit} offset ${offset}`,
    values: [],
  });
  const [count] = (await query({
    query: "select count(id) as count from  products",
    values: [],
  })) as any;
  return { res, count };
};

export const deleteProduct = async (id: number) => {
  const [product] = (await query({
    query: "SELECT * FROM products WHERE id = ?",
    values: [id],
  })) as any;

  fs.unlink(product.image);
  const res = await query({
    query: "DELETE FROM products WHERE id = ?",
    values: [id],
  });
  redirect("/admin/products/milk");
};

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
});
export const updateProduct = async (
  id: number,
  prevState: unknown,
  formData: FormData
) => {
  const result = editSchema.safeParse(
    Object.fromEntries(formData.entries())
  ) as any;
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const [product] = (await query({
    query: "SELECT * FROM products WHERE id = ?",
    values: [id],
  })) as any;
  if (product == null) return notFound();
  const data = result.data;
  let filePath = product.image;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(product.image);
    filePath = `public/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.image.arrayBuffer()));
  }

  await query({
    query: "UPDATE products SET name=?, price=?, image=? WHERE id=?",
    values: [data.name, data.price, filePath, id],
  });
  redirect("/admin/products/milk");
};

export const getProductsById = async (id: number) => {};
