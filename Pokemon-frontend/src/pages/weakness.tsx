import React from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import Sidebar from "../layout/sidebar";

const Weakness = () => {
  const columns: ColumnDef<any>[] = [
    { accessorKey: "type", header: "Type" },
    {
      accessorKey: "isWeakTo",
      header: "Weak To",
      cell: (info) => (
        <div>
          {(info.getValue() as string[]).map((item, index) => (
            <span
              key={index}
              className="inline-block bg-red-100 px-2 py-1 rounded m-1"
            >
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "isStrongTo",
      header: "Strong To",
      cell: (info) => (
        <div>
          {(info.getValue() as string[]).map((item, index) => (
            <span
              key={index}
              className="inline-block bg-green-100 px-2 py-1 rounded m-1"
            >
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "iNeutralTo",
      header: "Neutral To",
      cell: (info) => (
        <div>
          {(info.getValue() as string[]).map((item, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 px-2 py-1 rounded m-1"
            >
              {item}
            </span>
          ))}
        </div>
      ),
    },
    { accessorKey: "Action", header: "Action" },
  ];
  const data: any[] = [];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Weakness Table</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 py-2 text-left bg-gray-100"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Weakness;
