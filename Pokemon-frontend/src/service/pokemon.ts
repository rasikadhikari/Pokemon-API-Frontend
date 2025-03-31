import { axios } from "./axios";
import { AxiosResponse } from "axios";

export type Region = {
  image: any;
 _id: string;
  name: string;
  result:Region[]
};

export type Pokemon = {
  _id: string;
  name: string;
  region: string;
  type: string[];
  image: string;
  stats: {
    hp: number;
    attack: number;
    defence: number;
    specialAttack: number;
    specialDefence: number;
    speed: number;
  };

  isMythical: boolean;
  cries: string;
};
export type PokemonResponse={
    _id: string;
    name: string;
    region: string;
    type: string[];
    image: string;
    stats: {
      hp: number;
      attack: number;
      defence: number;
      specialAttack: number;
      specialDefence: number;
      speed: number;
    };
  
    isMythical: boolean;
    cries: string;
    result: Pokemon[] 
    pokemons:any 
}
export type RegionResponse = {
  data: any;
  _id: string;
  name: string;
  result: Region[];
};


export const fetchHomePageData = async (page:number): Promise<[AxiosResponse<RegionResponse>, AxiosResponse<PokemonResponse>]> => {
    try {
      const regionResponse: AxiosResponse<RegionResponse> = await axios.get(`/regions?page=${page}&limit=10`);
      const pokemonResponse: AxiosResponse<PokemonResponse> = await axios.get(`/pokemons?page=${page}&limit=10`);
      return [regionResponse, pokemonResponse];
    } catch (err) {
      console.error("Error fetching home page data:", err);
      throw err;
    }
  };
  
// Fetch list of Pokémon
export const fetchPokemonList = async (): Promise<[Error | null, Pokemon[] | null]> => {
  try {
    const response: AxiosResponse<Pokemon[]> = await axios.get("/pokemons");
    return [null, response.data];
  } catch (err) {
    console.error("Error fetching Pokémon list:", err);
    return [err as Error, null];
  }
};

// Create a new Pokémon
export const createPokemon = async (pokemon: Partial<Pokemon>): Promise<[Error | null, Pokemon | null]> => {
  try {
    const response: AxiosResponse<Pokemon> = await axios.post("/pokemons", pokemon);
    console.log("Created Pokémon:", response.data);
    return [null, response.data];
  } catch (err) {
    console.error("Error creating Pokémon:", err);
    return [err as Error, null];
  }
};

// Update an existing Pokémon
export const updatePokemon = async (
  id: number,
  body: Partial<Pokemon>
): Promise<[Error | null, Pokemon | null]> => {
  try {
    const response: AxiosResponse<Pokemon> = await axios.put(`/pokemons/${id}`, body);
    return [null, response.data];
  } catch (err) {
    console.error("Error updating Pokémon:", err);
    return [err as Error, null];
  }
};

// Get details of a Pokémon by ID
export const getPokemonById = async (id: number): Promise<[Error | null, Pokemon | null]> => {
  try {
    const response: AxiosResponse<Pokemon> = await axios.get(`/pokemons/${id}`);
    return [null, response.data];
  } catch (err) {
    console.error("Error fetching Pokémon details:", err);
    return [err as Error, null];
  }
};

// Delete a Pokémon
export const deletePokemon = async (id: number): Promise<[Error | null, boolean]> => {
  try {
    await axios.delete(`/pokemons/${id}`);
    return [null, true];
  } catch (err) {
    console.error("Error deleting Pokémon:", err);
    return [err as Error, false];
  }
};



// Get details of a Pokémon by ID
export const getRegionById = async (id: number): Promise<[Error | null, Pokemon | null]> => {
  try {
    const response: AxiosResponse<Pokemon> = await axios.get(`/regions/${id}`);
    return [null, response.data];
  } catch (err) {
    console.error("Error fetching Pokémon details:", err);
    return [err as Error, null];
  }
};


