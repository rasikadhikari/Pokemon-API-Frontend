import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../../service/axios";

const CreateMoves = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState(""); // Store selected type
  const [types, setTypes] = useState([]); // Store available types
  const [power, setPower] = useState<number | "">("");
  const [accuracy, setAccuracy] = useState<number | "">("");
  const [pp, setPP] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Pokémon types from the API
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("/types"); // Adjust API endpoint as needed
        setTypes(response.data.data.result || []);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };
    fetchTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !type || !power || !accuracy || !pp) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/moves", {
        name,
        type,
        power,
        accuracy,
        pp,
      });

      if (response.status === 200) {
        navigate("/admin/move");
      }
    } catch (error) {
      setError("Failed to create move. Please check your inputs.");
      console.error("Error creating move:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Create Move</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Type Dropdown */}
          <div>
            <label className="block font-medium">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)} // Now stores ObjectId
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a Type</option>
              {types.map((t: any) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Power</label>
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(Number(e.target.value) || "")}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Accuracy</label>
            <input
              type="number"
              value={accuracy}
              onChange={(e) => setAccuracy(Number(e.target.value) || "")}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium">PP</label>
            <input
              type="number"
              value={pp}
              onChange={(e) => setPP(Number(e.target.value) || "")}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Move"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMoves;
