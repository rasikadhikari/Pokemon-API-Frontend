import React, { useState, useEffect } from "react";
import axios from "../service/axios"; // Fixed Import
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import Sidebar from "../layout/sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Type = () => {
  const [typeData, setTypeData] = useState<any[]>([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async (page: number) => {
      try {
        const response = await axios.get(`/types?page=${page}&limit=10`);
        const data = response?.data?.data?.result || [];
        setTypeData(data);
        setTotalPages(response?.data?.data?.paginationInfo?.totalPages || 1);
        toast.success("Type fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      }
    };
    fetchData(currentPage);
  }, [currentPage]);

  // Handle Edit
  const editHandle = (id: string) => {
    navigate(`/admin/type/${id}`);
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/types/${id}`);
      setTypeData((prevData) => prevData.filter((type) => type._id !== id));
      toast.success("Type deleted successfully");
    } catch (error) {
      console.error("Error deleting type:", error);
      toast.error("Failed to delete type");
    }
  };

  // Table columns
  const columns: ColumnDef<any>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "colorCode", header: "Color Code" },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleDateString("en-US"),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ getValue }) =>
        new Date(getValue<string>()).toLocaleDateString("en-US"),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: (info) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
            onClick={() => editHandle(info.row.original._id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
            onClick={() => handleDelete(info.row.original._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: typeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex">
      <Sidebar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Type Table</h1>
        <button
          className="bg-yellow-300 w-24 rounded-md m-5 shadow-lg font-mono hover:bg-yellow-500"
          onClick={() => navigate("/admin/CreateType")}
        >
          Create
        </button>
        <table className="table-auto w-full border border-gray-300">
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
        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Type;
