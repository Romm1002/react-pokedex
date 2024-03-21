import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";


const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 20;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
        try {
          const {data: {results : pokemonsData}} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page  * limit}`)

          const pokemonDataList = [];
          await Promise.all(pokemonsData.map(async (pokemon) => {
            try {
              const {data: pokemonData} = await axios.get(pokemon.url);
              pokemonDataList.push(pokemonData);
            } catch (error) {
              console.error('Error fetching pokemons:', error);
            }
          }));
          pokemonDataList.sort((a, b) => a.id - b.id);
          setPokemons(pokemonDataList);
          setLoading(false)
        } catch (error) {
          console.error("Error fetching pokemons:", error);
        }
      }
    fetchData();
  }, [page]);

  const handleSearch = (searchTerm) => {
    const results = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  if (loading) {
    return (
      <p>Chargement...</p>
    )
  } else {
    return (
      <div className='pokemons'>
        <SearchBar onSearch={handleSearch} />
        {searchResults.length > 0
          ? searchResults.map((pokemon, index) => (
            <Link to={`/${pokemon.id}`}>
              <PokemonCard
                  key={index}
                  pokemon={pokemon}
                  setPokedexData={setPokemons}
                />
            </Link>
          ))
          : pokemons.map((pokemon, index) => (
            <Link to={`/${pokemon.id}`}>
              <PokemonCard
                key={index}
                pokemon={pokemon}
                setPokedexData={setPokemons}
              />
            </Link>
          ))
        }
        <div>
          <button onClick={() => setPage(page - 1)}>Page précédente</button>
          {page}
          <button onClick={() => setPage(page + 1)}>Page suivante</button>
        </div>
      </div>
    );
  }
};
export default PokemonList;
