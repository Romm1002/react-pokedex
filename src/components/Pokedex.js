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
      </div>
    </div>
  );
};

export default Pokedex;
