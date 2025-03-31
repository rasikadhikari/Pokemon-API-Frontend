import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../service/axios";

const EditType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState({
    name: "",
    colorCode: "",
    createdAt: 0,
    updatedAt: 0,
  });

  useEffect(() => {
    const fetchType = async () => {
      try {
        const response = await fetch(`http://localhost:3000/types/${id}`);
        if (!response.ok) throw new Error("Failed to fetch type");

        const data = await response.json();
        setType({
          name: data.dataById.name || "",
          colorCode: data.dataById.colorCode || "",
          createdAt: data.dataById.createdAt || 0,
          updatedAt: data.dataById.updatedAt || 0,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching type:", err);
      }
    };

    fetchType();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType({ ...type, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authToken = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3000/types/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(type),
      });

      if (!response.ok) throw new Error("Failed to update type");

      navigate("/admin/type"); // Redirect back to types list
    } catch (error) {
      console.error("Error updating type:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading type details...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Edit Type</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={type.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Color Code */}
          <div>
            <label className="block font-medium">Color Code</label>
            <input
              type="text"
              name="colorCode"
              value={type.colorCode}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditType;
