import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import Sidebar from "../layout/sidebar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { axios } from "../service/axios";
import { useNavigate } from "react-router-dom";

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchPokemons = (page: number) => {
    axios
      .get(`/pokemons?page=${page}&limit=10`)
      .then((res) => {
        setPokemonData(res.data.pokemons?.result || []);
        setTotalPages(res.data.paginationInfo?.totalPages || 1);
        toast.success("Pokémon data loaded successfully!");
      })
      .catch((err) => {
        console.error("Error fetching Pokémon data:", err);
        toast.error("Failed to fetch Pokémon data.");
      });
  };

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/pokedex/${id}`);
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`/pokemons/${id}`)
      .then(() => {
        setPokemonData((prevData) =>
          prevData.filter((pokemon) => pokemon.id !== id)
        );
        toast.success("Pokémon deleted successfully!");
      })
      .catch((err) => {
        console.error("Error deleting Pokémon:", err);
        toast.error("Failed to delete Pokémon.");
      });
  };

  const columns: ColumnDef<any>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "region.name", header: "Region" },
    {
      accessorKey: "type",
      header: "Type",
      cell: (info) => {
        const types = info.getValue() as { name: string }[];
        return types.map((typeObj) => typeObj.name).join(",");
      },
    },
    { accessorKey: "stats.hp", header: "HP" },
    { accessorKey: "stats.attack", header: "Attack" },
    { accessorKey: "stats.defence", header: "Defense" },
    {
      accessorKey: "isLegendary",
      header: "Legendary",
      cell: (info) => (info.getValue() ? "Yes" : "No"),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: (info) => (
        <img
          src={info.getValue() as string}
          alt={info.row.original.name}
          className="h-12 w-12 object-contain"
        />
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: (info) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(info.row.original._id)}
            className="bg-blue-500 text-white px-3 py-2 rounded-md"
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={() => handleDelete(info.row.original._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: pokemonData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Pokémon Table</h1>
        <button
          className="bg-yellow-300 w-30 h-auto justify-center rounded-md m-5 shadow-lg font-mono hover:bg-yellow-500"
          onClick={() => navigate("/admin/CreatePokedex")}
        >
          Add Pokémon
        </button>
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
        <Stack spacing={2} className="mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Pokemon;
