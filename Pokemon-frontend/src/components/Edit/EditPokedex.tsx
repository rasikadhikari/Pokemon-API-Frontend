import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axios } from "../../service/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPokedex = () => {
  const { id } = useParams(); // Get Pokémon ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Track loading state
  const [pokemonData, setPokemonData] = useState({
    name: "",
    types: [""],
    region: "",
    stats: {
      hp: 0,
      attack: 0,
      defence: 0,
      specialAttack: 0,
      specialDefence: 0,
      speed: 0,
    },
    evolveto: null,
    evolveFrom: null,
    order: 0,
    isLegendary: false,
    isMythical: false,
    cries: "",
  });

  const [regions, setRegions] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);

  // Fetch Pokémon details, regions, and types when component loads
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`/pokemons/${id}`);
        const data = response.data;

        setPokemonData({
          name: data.pokemon.name,
          types: data.pokemon.types || [""],
          region: data.pokemon.region || "",
          stats: {
            hp: data.pokemon.stats?.hp || 0,
            attack: data.pokemon.stats?.attack || 0,
            defence: data.pokemon.stats?.defence || 0,
            specialAttack: data.pokemon.stats?.specialAttack || 0,
            specialDefence: data.pokemon.stats?.specialDefence || 0,
            speed: data.pokemon.stats?.speed || 0,
          },
          evolveto: data.pokemon.evolveto || "",
          evolveFrom: data.pokemon.evolveFrom || "",
          order: data.pokemon.order || 0,
          isLegendary: data.pokemon.isLegendary || false, // Ensure boolean
          isMythical: data.pokemon.isMythical || false,
          cries: data.pokemon.cries || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    const fetchRegionsAndTypes = async () => {
      try {
        const regionResponse = await axios.get("/regions");
        const typeResponse = await axios.get("/types");

        if (!regionResponse || !typeResponse) {
          throw new Error("Failed to fetch regions or types");
        }

        const regionData = await regionResponse.data;
        const typeData = await typeResponse.data;

        setRegions(regionData.data.result || []);
        setTypes(typeData.data.result || []);
      } catch (error) {
        console.error("Error fetching regions or types:", error);
      }
    };

    fetchPokemon();
    fetchRegionsAndTypes();
  }, [id]);

  // Handle input changes for normal fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPokemonData({ ...pokemonData, [e.target.name]: e.target.value });
  };

  // Handle changes for list fields (types)
  const handleListChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newTypes = [...pokemonData.types];
    newTypes[index] = e.target.value;
    setPokemonData({ ...pokemonData, types: newTypes });
  };

  // Handle input changes for stats fields
  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonData({
      ...pokemonData,
      stats: { ...pokemonData.stats, [e.target.name]: Number(e.target.value) },
    });
  };

  // Handle form submission (Update Pokémon)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      console.error("No authentication token found");
      return;
    }

    // Validate required fields
    if (!pokemonData.name || !pokemonData.region || !pokemonData.types.length) {
      toast.error("Some required fields are missing");
      return;
    }

    console.log("Sending data:", JSON.stringify(pokemonData, null, 2));

    try {
      await axios.put(`/pokemons/${id}`, pokemonData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      toast.success("Pokémon updated successfully!");
      navigate("/admin/pokedex"); // Redirect back to Pokémon list
    } catch (error) {
      toast.error("Error updating Pokémon");
      console.error("Error updating Pokémon:", error);
    }
  };

  // Show loading message while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading Pokémon details...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Edit Pokémon</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={pokemonData.name} // Existing data will be shown
              onChange={(e) =>
                handleChange(e as React.ChangeEvent<HTMLInputElement>)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Types (Multiple types) */}
          <div>
            <label className="block font-medium">Types</label>
            {pokemonData.types.map((type, index) => (
              <select
                key={index}
                value={type}
                onChange={(e) => handleListChange(e, index)}
                className="w-full p-2 border rounded-md mb-2"
              >
                <option value="">Select Type</option>
                {types.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
            ))}
          </div>

          {/* Region */}
          <div>
            <label className="block font-medium">Region</label>
            <select
              name="region"
              value={pokemonData.region}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(pokemonData.stats).map(([key, value]) => (
              <div key={key}>
                <label className="block font-medium">{key}</label>
                <input
                  type="number"
                  name={key}
                  value={value} // Existing stats will be shown
                  onChange={handleStatsChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            ))}
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

      <ToastContainer />
    </div>
  );
};

export default EditPokedex;
