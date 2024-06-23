"use client";
import TableComponent from "@/components/TableComponent";
import React, { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "./action";
import { useRouter } from "next/navigation";
import { PaginationDemo } from "@/components/Pagination";

const headers = [
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
  // { key: "image", label: "Image" },
];
const Component = () => {
  const [product, setProduct] = useState<Row[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const router = useRouter();
  const [limit, setLimit] = useState(3);
  const handleEdit = (id: number) => {
    router.push(`/admin/products/milk/${id}`);
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
  };

  const offset = limit * (currentPage - 1);
  const fetchProducts = async () => {
    console.log(offset, limit, count, "fffff");
    const data = await getProducts(offset, limit);
    setProduct(data.res as any[]);
    setCount(data.count.count);
  };
  console.log(currentPage, "currennt");
  useEffect(() => {
    fetchProducts();
  }, [count, currentPage]);
  console.log(count < offset, "lllllllhhhhhhhhhh");
  return (
    <div>
      <TableComponent
        rowsData={product}
        headers={headers}
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
      />
      <PaginationDemo
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        previousDisabled={currentPage <= 1}
        nextDisabled={count < currentPage * limit}
      />
    </div>
  );
};

export default Component;
