import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import React from "react";
import Component from "../_components/Component";

const Milk = async () => {
  return (
    <div>
      <div className="flex justify-between ">
        <h1>Milk</h1>
        <div className="rounded">
          <a href="/admin/products/milk/milkForm">
            <Button className="bg-sky-400 rounded-lg">
              <CirclePlus className="mr-2" />
              Add milk
            </Button>
          </a>
        </div>
      </div>
      <div className="p-3 mt-10">
        <Component />
      </div>
    </div>
  );
};

export default Milk;
