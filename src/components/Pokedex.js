import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";

const Pokedex = () => {
  const [pokedexData, setPokedexData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Récupération des données du Pokédex depuis le localStorage
    const currentPokedexData = localStorage.getItem("pokedexData");
    if (currentPokedexData) {
      setPokedexData(JSON.parse(currentPokedexData));
    }
  }, []);

  // Supprimer toutes les données du localStorage liées au Pokédex
  const deleteAll = () => {
    localStorage.removeItem("pokedexData");
    setPokedexData([]);
  };

  // Filtrer les résultats de recherche
  useEffect(() => {
    const results = pokedexData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, pokedexData]);

  return (
    <div>
      <div className="searchBar">
        <SearchBar value={searchTerm} onSearch={setSearchTerm} />
      </div>
      <button onClick={deleteAll} className="btn btn-warning mb-3">Vider le pokédex</button>
      <div className="pokemons-list">
        {searchTerm ? (
          searchResults.length > 0 ? (
            searchResults.map((pokemon) => (
              <PokemonCard pokemon={pokemon} />
            ))
          ) : (
            <div>Aucun Pokémon</div>
          )
        ) : (
          pokedexData.map((pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))
        )}
      </div>
    </div>
  );
};

export default Pokedex;
