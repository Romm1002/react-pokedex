import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

const Pokedex = () => {
  const [pokedexData, setPokedexData] = useState([]);

  useEffect(() => {
    // Récupération des données du Pokédex depuis le localStorage
    const currentPokedexData = localStorage.getItem("pokedexData");
    if (currentPokedexData) {
      setPokedexData(JSON.parse(currentPokedexData));
    }
  }, []);

  const deleteAll = () => {
    // Supprimer toutes les données du localStorage liées au Pokédex
    localStorage.removeItem("pokedexData");
    // Mettre à jour l'état pour vider le Pokédex
    setPokedexData([]);
  };
  

  return (
    <div>
      <div className="pokedex-pokemons">
        {pokedexData.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            setPokedexData={setPokedexData}
          />
        ))}
        <button onClick={deleteAll}>Supprimer tout le pokédex</button>
      </div>
    </div>
  );
};

export default Pokedex;
