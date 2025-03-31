import React, { useState } from "react";
import { axios } from "../../service/axios";
import { useNavigate } from "react-router-dom";

const CreateTypes = () => {
  const [name, setName] = useState("");
  const [colorCode, setColorCode] = useState("#000000"); // Default color to black
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !colorCode) {
      alert("Please fill in all the fields!");
      return;
    }

    try {
      const response = await axios.post("/types", {
        name,
        colorCode,
      });
      console.log("New type added:", response.data);
      navigate("/admin/type");
    } catch (error) {
      console.error("Error adding type:", error);
    }
  };

  return (
    <div className="flex">
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Create New Type</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="colorCode" className="block font-medium">
              Color Code
            </label>
            <input
              type="color"
              id="colorCode"
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="mt-2 text-gray-500">Selected Color: {colorCode}</p>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Add Type
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTypes;
