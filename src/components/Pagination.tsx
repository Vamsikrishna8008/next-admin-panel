import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  previousDisabled: boolean;
  nextDisabled: boolean;
}

export const PaginationDemo: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  previousDisabled,
  nextDisabled,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <Button
          disabled={previousDisabled}
          className="cursor-pointer bg-white hover:bg-white text-black"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <PaginationPrevious />
        </Button>

        <PaginationItem>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>
        <Button
          disabled={nextDisabled}
          className="cursor-pointer bg-white hover:bg-white text-black"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <PaginationNext />
        </Button>
      </PaginationContent>
    </Pagination>
  );
};
