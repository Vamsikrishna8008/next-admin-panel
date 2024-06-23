"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { addProduct, updateProduct } from "./action";
import Image from "next/image";
import { imageUrl } from "@/lib/utils";

const ProductForm = ({ product }: { product?: Row | null }) => {
  const [price, setPrice] = useState<number | undefined>(product?.price);
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  ) as any;
  const imgName = product?.image.split("/").pop();
  return (
    <>
      <form
        action={action}
        className=" flex flex-col justify-center items-center gap-5"
      >
        <div className=" min-w-[500px] flex flex-col gap-2">
          <Label>Product Name</Label>
          <Input
            type="text"
            placeholder="Product Name"
            name="name"
            defaultValue={product?.name || ""}
          />
          {error.name && <p className="text-red-500">{error.name}</p>}
        </div>
        <div className=" min-w-[500px] flex flex-col gap-2">
          <Label>Product Price</Label>
          <Input
            type="number"
            placeholder="Product Price"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          {error.price && <p className="text-red-500">{error.price}</p>}
        </div>
        <div className=" min-w-[500px] flex flex-col gap-2">
          <Label>Image</Label>
          <Input type="file" placeholder="Image" name="image" />
          {product != null && (
            <img
              src={imageUrl + imgName}
              alt="product"
              width={100}
              height={100}
            />
          )}
          {error.image && <p className="text-red-500">{error.image}</p>}
        </div>
        <Button type="submit" className="bg-sky-400 rounded-lg">
          Add milk
        </Button>
      </form>
    </>
  );
};

export default ProductForm;
