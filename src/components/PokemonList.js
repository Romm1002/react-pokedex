import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import axios from "axios";
import SearchBar from "./SearchBar";
import { useSearchParams } from "react-router-dom";

const PokemonList = () => {
  const [pokemonUrls, setPokemonUrls] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 20;
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const page = isNaN(parseInt(searchParams.get("page"))) ? 0 : parseInt(searchParams.get("page"));

  useEffect(() => {
    const _ = ( async () =>{
      try {
        let next = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
        let i = 0;
        let pokemonsData = [];
        while (next !== null) {
          if(i >= 5){
            setPokemonUrls(pokemonsData)
            throw('too many requests')
          }
          i++;
          const {data} = await axios.get(next);
          next = data.next;
          pokemonsData = pokemonsData.concat(data.results)
        }
        setPokemonUrls(pokemonsData)

      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    })();
  }, [])

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const urls = pokemonUrls.slice(pageSize * page, pageSize * page + pageSize);
        const response = await Promise.all(
          urls.map(pokemon => axios.get(pokemon.url))
        );
        setPokemons(response.map(data => data.data));
        setLoading(false)
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };
    fetchData();
  }, [page, pokemonUrls]);

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
      <div>
        <div className="searchBar">
          <SearchBar value ={searchTerm} onSearch={setSearchTerm} />
        </div>
        <div className="pokemons-list">
          {searchTerm
            ? searchResults.length > 0 
                ? searchResults.map((pokemon, index) => <PokemonCard pokemon={pokemon} key={index}  />)
                : <>Aucun pokémon ne corréspond</>
            : pokemons.map((pokemon, index) => <PokemonCard pokemon={pokemon} key={index}  />)
          }
          <Pagination page={page} />
        </div>
      </div>
    );
  }
};
export default PokemonList;
