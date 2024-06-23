"use client";

import React, { useState } from "react";

import ProductForm from "../../_components/ProductForm";

const Form = () => {
  return (
    <>
      <h1 className="text-center font-bold text-2xl p-4">Add Milk</h1>

      <ProductForm />
    </>
  );
};

export default Form;
