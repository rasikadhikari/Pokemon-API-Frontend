import React, { useEffect, useState } from "react";
import Sidebar from "../layout/sidebar";
import { axios } from "../service/axios";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Moves = () => {
  const [myMoves, setMyMoves] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/moves");
        const data = response.data.data.result || [];
        setMyMoves(data);
        toast.success("Moves fetched successfully!");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching moves.");
      }
    };
    fetchData();
  }, []);

  const editHandle = (id: string) => {
    navigate(`/admin/move/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/moves/${id}`);
      setMyMoves(myMoves.filter((move) => move._id !== id));
      toast.success("Move deleted successfully!");
    } catch (error) {
      console.error("Error deleting move:", error);
      toast.error("Error deleting move.");
    }
  };

  const columns: ColumnDef<any>[] = [
    { accessorKey: "name", header: "Name" },
    {
      accessorKey: "type",
      header: "Type",
      cell: (info) => {
        const types = info.getValue() as { name: string }[] | { name: string };
        if (Array.isArray(types)) {
          return types.map((typeObj) => typeObj.name).join(",");
        } else {
          return types && typeof types === "object" && "name" in types
            ? types.name
            : "No Type";
        }
      },
    },
    { accessorKey: "power", header: "Power" },
    { accessorKey: "accuracy", header: "Accuracy" },
    { accessorKey: "pp", header: "PP" },
    {
      accessorKey: "Action",
      header: "Action",
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => editHandle(info.row.original._id)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(info.row.original._id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: myMoves,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Sidebar />
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold mb-4">Moves</h1>
        <button
          className="bg-yellow-300 w-24 h-auto justify-center rounded-md m-5 shadow-lg font-mono hover:bg-yellow-500"
          onClick={() => navigate("/admin/CreateMoves")}
        >
          Add Move
        </button>
        <div className="overflow-x-auto">
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
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4 text-gray-500"
                  >
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Moves;
