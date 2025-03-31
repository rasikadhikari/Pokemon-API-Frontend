import React, { useState, useEffect } from "react";
import { fetchHomePageData } from "../service/pokemon";
import { Pokemon, Region } from "../service/pokemon";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PokemonComponent() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async (page: number) => {
      try {
        const [regionResponse, pokemonResponse] = await fetchHomePageData(page);
        setRegions(regionResponse.data.data.result || []);
        setPokemonData(pokemonResponse.data.pokemons.result || []);
        setTotalPages(pokemonResponse.data.pokemons.totalPages || 1);
        toast.success("Data loaded successfully!");
      } catch (err) {
        toast.error("Error fetching data. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    getData(currentPage);
  }, [currentPage]);

  const handleRegionClick = (regionId: string) => {
    toast.success("Navigating to region!");
    navigate(`/regions/${regionId}`);
  };

  const handlePokemonClick = (pokemonId: string) => {
    toast.success("Navigating to Pokémon details!");
    navigate(`/Pokemons/${pokemonId}`);
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-center text-4xl font-bold text-green-600">
        Welcome to the Pokémon World
      </h1>
      <Search />
      {error && <p className="text-center text-red-500">{error}</p>}
      <div>
        <h2 className="text-center text-2xl font-serif font-semibold text-blue-400 mt-10">
          Regions
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading regions...</p>
        ) : (
          <div className="mt-4">
            <Slide easing="ease" autoplay indicators>
              {regions.length > 0 ? (
                regions.map((region) => (
                  <div
                    key={region._id || region.name}
                    className="flex justify-center items-center"
                  >
                    <div
                      className="w-48 h-auto border rounded-lg shadow-lg flex flex-col items-center bg-white p-4 cursor-pointer"
                      onClick={() => handleRegionClick(String(region._id))}
                    >
                      <img
                        src={`http://localhost:3000/${region.image}`}
                        alt={region.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <p className="text-center text-sm font-semibold mt-2">
                        {region.name}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No regions available.
                </p>
              )}
            </Slide>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-center text-2xl font-serif font-semibold text-blue-400 mt-10">
          Pokémon
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading Pokémon...</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
            {pokemonData.length > 0 ? (
              pokemonData.map((pokemon) => (
                <div
                  key={pokemon._id || pokemon.name}
                  className="w-64 h-auto border rounded-lg shadow-lg flex flex-col items-center bg-white p-4 cursor-pointer"
                  onClick={() => handlePokemonClick(String(pokemon._id))}
                >
                  <img
                    src={`http://localhost:3000/${pokemon.image}`}
                    alt={pokemon.name}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <h3 className="mt-2 text-lg font-semibold">{pokemon.name}</h3>
                  <audio
                    controls
                    className="flex w-28 object-cover rounded-full "
                  >
                    <source
                      src={`http://localhost:3000/${pokemon.cries}`}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No Pokémon available.</p>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PokemonComponent;
