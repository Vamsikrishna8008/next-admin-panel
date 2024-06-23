import { query } from "@/lib/db";
import React from "react";
import ProductForm from "../../_components/ProductForm";

const page = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const [product] = (await query({
    query: "select * from products where id=?",
    values: [id],
  })) as any;
  return (
    <>
      <div className="">
        <ProductForm product={product} />
      </div>
    </>
  );
};

export default page;
