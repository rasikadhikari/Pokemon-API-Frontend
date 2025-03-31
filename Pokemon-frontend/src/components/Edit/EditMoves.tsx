import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../service/axios";

const EditMove = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [move, setMove] = useState({
    name: "",
    type: "",
    power: "",
    accuracy: "",
    pp: "",
  });

  useEffect(() => {
    const fetchMove = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/moves/${id}`);

        const data = response.data.data;

        if (data) {
          setMove({
            name: data.name || "",
            type: data.type || "",
            power: data.power || "",
            accuracy: data.accuracy || "",
            pp: data.pp || "",
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching move:", error);
      }
    };
    const fetchTypes = async () => {
      try {
        const response = await axios.get("/types"); // Adjust API endpoint as needed
        console.log(response);
        setTypes(response.data.data.result || []);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };
    fetchTypes();

    fetchMove();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setMove({ ...move, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authToken = localStorage.getItem("token");

    try {
      await axios.put(`/moves/${id}`, move);

      navigate("/admin/move"); // Redirect to moves list
    } catch (error) {
      console.error("Error updating move:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading move details...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Edit Move</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={move.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block font-medium">Type</label>
            <select
              value={move.type}
              onChange={(e) => setMove({ ...move, type: e.target.value })} // Now stores ObjectId
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
          {/* Power */}
          <div>
            <label className="block font-medium">Power</label>
            <input
              type="number"
              name="power"
              value={move.power}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Accuracy */}
          <div>
            <label className="block font-medium">Accuracy</label>
            <input
              type="number"
              name="accuracy"
              value={move.accuracy}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* PP */}
          <div>
            <label className="block font-medium">PP</label>
            <input
              type="number"
              name="pp"
              value={move.pp}
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

export default EditMove;
