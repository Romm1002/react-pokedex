import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PokemonDetails({ id }) {
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: pokemonData } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const { data: pokemonFormData } = await axios.get(
          pokemonData.forms[0].url
        );
        pokemonData.forms = pokemonFormData;
        setPokemon(pokemonData);
        console.log(pokemonData);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchData();
  }, [id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  if (!pokemon) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div>
        <Link onClick={() => navigate(-1)}>Retour</Link>
        <h1>{pokemon.name}</h1>
        <div class="container">
          <div>
            <img src={pokemon.sprites.front_default} alt="" />
          </div>
          <div
            className="card"
            style={{ backgroundColor: getBackgroundColor(pokemon.types) }}
          >
            <h2>Types</h2>
            <ul>
              {pokemon.types.map((type, index) => (
                <li key={index}>{type.type.name}</li>
              ))}
            </ul>
            <h2>Statistiques</h2>
            <dl>
              {pokemon.stats.map((stat, index) => (
                <>
                  <dt key={index}>{stat.stat.name}</dt>
                  <dd>{stat.base_stat}</dd>
                </>
              ))}
            </dl>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonDetails;
