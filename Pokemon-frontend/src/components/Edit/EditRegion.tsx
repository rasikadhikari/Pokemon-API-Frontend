import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRegion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    name: "",
    description: "",
    createdAt: 0,
    updatedAt: 0,
  });

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/regions/${id}`);
        if (!response) throw new Error("Failed to fetch region");

        const data = await response.json();
        setRegion({
          name: data.dataById.name || "",
          description: data.dataById.description || "",
          createdAt: data.dataById.createdAt || 0,
          updatedAt: data.dataById.updatedAt || 0,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching region:", err);
      }
    };

    fetchRegion();
  }, [id]);

  const handleChange = (e: any) => {
    setRegion({ ...region, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const authToken = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3000/regions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(region),
      });

      if (!response.ok) throw new Error("Failed to update region");

      navigate("/admin/region"); // Redirect back to regions list
    } catch (error) {
      console.error("Error updating region:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading region details...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Edit Region</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={region.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={region.description}
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
}

export default EditRegion;
