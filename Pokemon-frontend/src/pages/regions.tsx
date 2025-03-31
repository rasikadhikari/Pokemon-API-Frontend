import React, { useEffect, useState } from "react";
import Sidebar from "../layout/sidebar";
import { axios } from "../service/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const Region = () => {
  const [myRegion, setMyRegion] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/regions");
        const data = response.data.data.result || [];
        setMyRegion(data);
        toast.success("Regions fetched successfully!");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch regions.");
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/region/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/regions/${id}`);
      setMyRegion((prevData) => prevData.filter((region) => region._id !== id));
      toast.success("Region deleted successfully!");
    } catch (error) {
      console.error("Error deleting region:", error);
      toast.error("Failed to delete the region. Please try again.");
    }
  };

  const columns: ColumnDef<any>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ getValue }) => (
        <img
          src={getValue() as string}
          alt="Region"
          className="w-20 h-20 object-cover"
        />
      ),
    },
    {
      accessorKey: "Action",
      header: "Action",
      cell: (info) => (
        <div>
          <button
            onClick={() => handleEdit(info.row.original._id)}
            className="bg-blue-500 text-white px-3 py-2 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(info.row.original._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: myRegion,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <h1 className="text-2xl font-bold mb-4">Region</h1>
        <button
          className="bg-yellow-300 w-24 rounded-md m-5 shadow-lg font-mono hover:bg-yellow-500"
          onClick={() => navigate("/admin/CreateRegion")}
        >
          Add Region
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

export default Region;
