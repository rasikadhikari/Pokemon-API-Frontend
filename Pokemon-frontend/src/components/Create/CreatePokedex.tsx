import React, { useEffect, useState } from "react";
import { axios } from "../../service/axios";
import { useNavigate } from "react-router-dom";

const CreatePokedex = () => {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [hp, setHp] = useState(0);
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [specialAttack, setSpecialAttack] = useState(0);
  const [specialDefence, setSpecialDefence] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [isLegendary, setIsLegendary] = useState(false);
  const [isMythical, setIsMythical] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [cries, setCries] = useState<File | null>(null);
  const [evolveFrom, setEvolveFrom] = useState("");
  const [evolveTo, setEvolveTo] = useState("");
  const [regions, setRegions] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regionResponse = await axios.get("/regions");
        const typeResponse = await axios.get("/types");

        setRegions(regionResponse.data.data.result || []);
        setTypes(typeResponse.data.data.result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image || !cries) {
      alert("Please upload both image and cry!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("region", region);
    formData.append("type", JSON.stringify([type])); // Ensure type is a JSON array

    const stats = {
      hp: Number(hp),
      attack: Number(attack),
      defence: Number(defense),
      specialAttack: Number(specialAttack),
      specialDefence: Number(specialDefence), // Corrected spelling to match backend
      speed: Number(speed),
    };
    formData.append("stats", JSON.stringify(stats));

    formData.append("order", "1"); // Default order
    formData.append("isMythical", String(isMythical));
    formData.append("isLegendary", String(isLegendary));
    formData.append("cries", cries);
    formData.append("image", image);
    if (evolveFrom) formData.append("evolveFrom", evolveFrom);
    if (evolveTo) formData.append("evolveto", evolveTo);

    try {
      const response = await axios.post("/pokemons", formData);
      console.log("Form data being submitted:", formData);
      console.log("New Pokémon added:", response.data);
      navigate("/admin/pokedex");
    } catch (error: any) {
      console.error("Error adding Pokémon:", error.response?.data || error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Add New Pokémon
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Pokémon name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                {types.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                HP
              </label>
              <input
                type="number"
                placeholder="HP"
                value={hp}
                onChange={(e) => setHp(Number(e.target.value))}
                required
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Attack
              </label>
              <input
                type="number"
                placeholder="Attack"
                value={attack}
                onChange={(e) => setAttack(Number(e.target.value))}
                required
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Defense
              </label>
              <input
                type="number"
                placeholder="Defense"
                value={defense}
                onChange={(e) => setDefense(Number(e.target.value))}
                required
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Special Attack
              </label>
              <input
                type="number"
                placeholder="Special Attack"
                value={specialAttack}
                onChange={(e) => setSpecialAttack(Number(e.target.value))}
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Special Defense
              </label>
              <input
                type="number"
                placeholder="Special Defense"
                value={specialDefence}
                onChange={(e) => setSpecialDefence(Number(e.target.value))}
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Speed
              </label>
              <input
                type="number"
                placeholder="Speed"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isLegendary}
                  onChange={(e) => setIsLegendary(e.target.checked)}
                  className="form-checkbox"
                />{" "}
                <span className="ml-2 text-sm">Is Legendary</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isMythical}
                  onChange={(e) => setIsMythical(e.target.checked)}
                  className="form-checkbox"
                />{" "}
                <span className="ml-2 text-sm">Is Mythical</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Evolve From
              </label>
              <input
                type="text"
                placeholder="Evolve From (optional)"
                value={evolveFrom}
                onChange={(e) => setEvolveFrom(e.target.value)}
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Evolve To
              </label>
              <input
                type="text"
                placeholder="Evolve To (optional)"
                value={evolveTo}
                onChange={(e) => setEvolveTo(e.target.value)}
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                required
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Cry
              </label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) =>
                  setCries(e.target.files ? e.target.files[0] : null)
                }
                required
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md w-full hover:bg-blue-700"
          >
            Add Pokémon
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePokedex;
