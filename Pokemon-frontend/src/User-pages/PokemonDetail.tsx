import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/pokemons/${id}`
        );
        setPokemon(response.data.pokemon);
        toast.success("Pokémon details loaded successfully!");
      } catch (err) {
        setError("Failed to load Pokémon details.");
        toast.error("Error loading Pokémon details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-500">Loading Pokémon details...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center text-blue-500 capitalize">
        {pokemon.name}
      </h1>
      <h3 className="text-2xl font-bold text-center italic text-gray-500 ">
        #0{pokemon.order}
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-between mt-4">
        {/* Pokémon Image */}
        <img
          src={`http://localhost:3000/${pokemon.image}`}
          alt={pokemon.name}
          className="w-64 h-64 object-cover rounded-lg border shadow-lg"
        />

        {/* Pokémon Stats */}
        <div className="mt-4 md:mt-0 md:ml-6 w-full md:w-1/2">
          <h2 className="text-xl font-bold text-gray-700">Stats</h2>
          <div className="mt-2">
            {Object.entries(pokemon.stats).map(([key, value]) => (
              <div key={key} className="mb-2">
                <p className="font-semibold capitalize">
                  {key}: {value as number}
                </p>
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                  <div
                    className="bg-orange-500 h-2.5 rounded-full"
                    style={{ width: `${((value as number) * 100) / 255}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pokémon Type */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-700">Type</h2>
        <div className="flex gap-2 mt-2">
          {pokemon.type.map((type: { name: string }, index: number) => (
            <span
              key={index}
              className="px-4 py-1 bg-yellow-300 text-gray-900 rounded-full text-sm font-semibold"
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>

      {/* Evolution */}
      {pokemon.evolveto && pokemon.evolveFrom && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-700">Evolution</h2>
          <p className="text-gray-600">
            Next Evolution: {pokemon.evolveto?.name || []}
          </p>
          <p className="text-gray-600">
            Evolve From: {pokemon.evolveFrom?.name}
          </p>
        </div>
      )}

      {/* Cry Audio */}
      {pokemon.cries && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-700">Cry</h2>
          <audio controls className="mt-2">
            <source
              src={`http://localhost:3000/${pokemon.cries}`}
              type="audio/ogg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
