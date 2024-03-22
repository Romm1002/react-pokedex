import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import axios from "axios";
import SearchBar from "./SearchBar";
import { useSearchParams } from "react-router-dom";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const limit = 20;
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const page = isNaN(searchParams.get("page")) ? 0 : parseInt(searchParams.get("page"));
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const {
          data: { results: pokemonsData },
        } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
            page * limit
          }`
        );

        const pokemonDataList = [];
        await Promise.all(
          pokemonsData.map(async (pokemon) => {
            try {
              const { data: pokemonData } = await axios.get(pokemon.url);
              pokemonDataList.push(pokemonData);
            } catch (error) {
              console.error("Error fetching pokemons:", error);
            }
          })
        );
        pokemonDataList.sort((a, b) => a.id - b.id);
        setPokemons(pokemonDataList);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const results = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, pokemons]) 

  if (loading) {
    return <p>Chargement...</p>;
  } else {
    return (
      <div className="pokemons">
        <SearchBar value ={searchTerm} onSearch={setSearchTerm} />
        {searchTerm
          ? searchResults.length > 0 
              ? searchResults.map((pokemon, index) => <PokemonCard pokemon={pokemon} key={index}  />)
              : <>Aucun pokémon ne corréspond</>
          : pokemons.map((pokemon, index) => <PokemonCard pokemon={pokemon} key={index}  />)
        }
        <Pagination page={page} />
      </div>
    );
  }
};
export default PokemonList;
