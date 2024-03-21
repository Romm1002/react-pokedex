import { useState } from "react";

const PokemonCard = ({ pokemon, setPokedexData }) => {
  const [isInPokedex, setIsInPokedex] = useState(false);

  const addPokedex = () => {
    if (isInPokedex === false){
        const currentPokedexData = localStorage.getItem("pokedexData");
        let pokedexData = currentPokedexData ? JSON.parse(currentPokedexData) : [];
    
        pokedexData.push(pokemon);
    
        localStorage.setItem("pokedexData", JSON.stringify(pokedexData));

        setIsInPokedex(true);
    }
  };

  const removeFromPokedex = (pokemonToRemove) => {
    const pokedexData = JSON.parse(localStorage.getItem("pokedexData"));

    const updatedPokedexData = pokedexData.filter(
      (p) => p.name !== pokemonToRemove.name
    );

    setPokedexData(updatedPokedexData);

    localStorage.setItem("pokedexData", JSON.stringify(updatedPokedexData));
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
    <div className="card" style={cardStyle}>
      <h3>
        {pokemon.name} #{pokemon.id}
      </h3>
      <ul>
        {pokemon.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
      {setPokedexData === undefined ? (
        <button onClick={addPokedex}>Ajouter au Pokédex</button>
      ) : (
        <button onClick={() => removeFromPokedex(pokemon)}>
          Retirer du Pokédex
        </button>
      )}
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
};

export default PokemonCard;
