import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, DeleteIcon, Edit, Trash2 } from "lucide-react";
import React from "react";
// Import your table components as they are defined in your project

type Header = {
  key: string; // Corresponds to the keys of the Row type
  label: string; // Display name for the table header
};

type Row = {
  id: number;
  name: string;
  price: number;
  image: string;
};

interface TableComponentProps {
  headers: Header[];
  rowsData: Row[] | undefined;
  onEditClick?: (rowIndex: number) => void;
  onDeleteClick?: (rowIndex: number) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  headers,
  rowsData,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            {headers.map((header) => (
              <TableHead key={header.key}>{header.label}</TableHead>
            ))}
            {(onEditClick || onDeleteClick) && <TableHead>Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowsData?.map(
            (
              row,
              i // Removed the index key here for TableRow
            ) => (
              <TableRow key={row.id}>
                <TableCell>{i + 1}</TableCell>{" "}
                {/* Use row.id for a unique key */}
                {headers.map((header) => (
                  // Use header.key to dynamically access Row properties
                  <TableCell key={`${row.id}-${header.key}`}>
                    {row[header.key as keyof Row]}
                  </TableCell>
                ))}
                {(onEditClick || onDeleteClick) && (
                  <TableCell className="flex gap-5 ">
                    {onEditClick && (
                      <div
                        className="text-blue-700 hover:text-blue-900"
                        onClick={() => onEditClick(row.id)}
                      >
                        <Edit />
                      </div>
                    )}
                    {onDeleteClick && (
                      <div
                        className=" text-red-700 hover:text-red-900"
                        onClick={() => onDeleteClick(row.id)}
                      >
                        <Trash2 />
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
