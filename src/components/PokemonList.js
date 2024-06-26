import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import axios from "axios";
import SearchBar from "./SearchBar";
import { useSearchParams } from "react-router-dom";

const PokemonList = () => {
  const [pokemonUrls, setPokemonUrls] = useState([]);
  const [pokemonPageUrls, setPokemonPageUrls] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 20;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const page = isNaN(parseInt(searchParams.get("page"))) ? 0 : parseInt(searchParams.get("page"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        let next = 'https://pokeapi.co/api/v2/pokemon?limit=500&offset=0';
        let i = 0;
        let pokemonsData = [];
        while (next !== null) {
          if (i >= 5) {
            setPokemonUrls(pokemonsData);
            throw (new Error('trop de requêtes!'));
          }
          i++;
          const { data } = await axios.get(next);
          next = data.next;
          pokemonsData = pokemonsData.concat(data.results);
        }
        setPokemonUrls(pokemonsData);
        setPokemonPageUrls(pokemonsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des pokémons:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const urls = pokemonPageUrls.slice(pageSize * page, pageSize * page + pageSize);
        const response = await Promise.all(
          urls.map(pokemon => axios.get(pokemon.url))
        );
        setPokemons(response.map(data => data.data));
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des pokémons:", error);
      }
    };
    fetchData();
  }, [page, pokemonPageUrls]);

  useEffect(() => {
    const results = pokemonUrls.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setPokemonPageUrls(results);
  }, [searchTerm, pokemonUrls]);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(pokemonPageUrls.length / pageSize);

  return (
    <div>
      <div className="searchBar">
        <SearchBar value={searchTerm} onSearch={setSearchTerm} />
      </div>
      {loading ? <p>Chargement...</p> : (
        <div className="pokemons-list">
          {searchTerm && pokemons.length === 0 ? <p>Aucun pokémon ne correspond</p> :
            pokemons.length === 0 ? <p>Un problème est survenu</p> :
              pokemons.map((pokemon, index) => <PokemonCard pokemon={pokemon} key={index} />)
          }
          <Pagination page={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default PokemonList;
