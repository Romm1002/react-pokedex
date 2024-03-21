import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const {
          data: { results: pokemonsData },
        } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        setPokemons(pokemonsData);

        const pokemonDataList = [];
        await Promise.all(
          pokemonsData.map(async (pokemon) => {
            try {
              const { data: pokemonData } = await axios.get(pokemon.url);
              const { data: pokemonFormData } = await axios.get(
                pokemonData.forms[0].url
              );
              pokemonData.forms = pokemonFormData;
              pokemonDataList.push(pokemonData);
            } catch (error) {
              console.error("Error fetching pokemons:", error);
            }
          })
        );
        setPokemons(pokemonDataList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchData();
  }, [offset]);

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePreviousPage = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  // Fonction recherche
  const handleSearch = (searchTerm) => {
    const results = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  if (loading) {
    return <p>Chargement...</p>;
  } else {
    return (
      <div>
        <SearchBar onSearch={handleSearch} />
        <div className="pokemons">
          {searchResults.length > 0
            ? searchResults.map((pokemon, index) => (
                <PokemonCard
                  key={index}
                  pokemon={pokemon}
                  setPokedexData={setPokemons}
                />
              ))
            : pokemons.map((pokemon, index) => (
                <PokemonCard
                  key={index}
                  pokemon={pokemon}
                  setPokedexData={setPokemons}
                />
              ))}
          <div>
            <button onClick={handlePreviousPage}>Page précédente</button>
            <button onClick={handleNextPage}>Page suivante</button>
          </div>
        </div>
      </div>
    );
  }
};

export default PokemonList;
