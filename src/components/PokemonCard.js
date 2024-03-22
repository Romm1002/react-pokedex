import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon, setPokedexData }) => {
  const [isInPokedex, setIsInPokedex] = useState(false);

  useEffect(() => {
    const currentPokedexData = localStorage.getItem("pokedexData");
    if (currentPokedexData) {
      const pokedexData = JSON.parse(currentPokedexData);
      const isInPokedex = pokedexData.some(
        (p) => p.id === pokemon.id
      );
      setIsInPokedex(isInPokedex);
    }
  }, [pokemon.id]);

  const addPokedex = (event) => {
    event.preventDefault();
    const currentPokedexData = localStorage.getItem("pokedexData");
    const pokedexData = currentPokedexData ? JSON.parse(currentPokedexData) : [];

    if (!isInPokedex) {
      const updatedPokedexData = [...pokedexData, pokemon];
      localStorage.setItem("pokedexData", JSON.stringify(updatedPokedexData));
      setIsInPokedex(true);
    }
  };

  const removeFromPokedex = (event) => {
    event.preventDefault();
    const currentPokedexData = localStorage.getItem("pokedexData");
    const pokedexData = currentPokedexData ? JSON.parse(currentPokedexData) : [];
  
    const updatedPokedexData = pokedexData.filter(
      (p) => p.id !== pokemon.id
    );
  
    localStorage.setItem("pokedexData", JSON.stringify(updatedPokedexData));
    setIsInPokedex(false);
    if(setPokedexData)
      setPokedexData(updatedPokedexData)
  };

  const getBackgroundColor = (types) => {
    const typeColors = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
    };

    return types.length > 1
      ? typeColors[types[0].type.name]
      : typeColors[types[0].type.name];
  };

  const cardStyle = {
    backgroundColor: getBackgroundColor(pokemon.types),
  };

  return (
    <Link to={`/${pokemon.id}`} id="link">
      <div className="card" style={cardStyle}>
        <h3>
          <span>{pokemon.name}</span>
          <span id="id">#{pokemon.id}</span>
        </h3>

        <ul>
          {pokemon.types.map((type, index) => (
            <li key={index}>{type.type.name}</li>
          ))}
        </ul>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width="100px"
        />
        {!isInPokedex ? (
          <button onClick={addPokedex} className="btn btn-success">Ajouter au Pokédex</button>
        ) : (
          <button onClick={removeFromPokedex} className="btn btn-danger">
            Retirer du Pokédex
          </button>
        )}
      </div>
    </Link>
  );
};

export default PokemonCard;
