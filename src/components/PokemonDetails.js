import axios from "axios";
import { useEffect, useState } from "react";

function PokemonDetails({id}) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const _ = (async () => {
            try {
                const {data: pokemonData} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const {data: pokemonFormData} = await axios.get(pokemonData.forms[0].url);
                pokemonData.forms = pokemonFormData;
                setPokemon(pokemonData);
                console.log(pokemonData)
            } catch (error) {
                console.error('Error fetching pokemons:', error);
            }
        })();
    },[])
    if (!pokemon) {
        <div>Chargement...</div>
    } else {
        return ( 
            <div>
                <h1>{pokemon.name}</h1>
                <div>
                    <img src={pokemon.sprites.front_default} />
                    <div>
                        <ul>
                            {pokemon.types.map((type, index) => <li key={index}>{type.type.name}</li>)}
                        </ul>
                        <p>Statistiques</p>
                        <dl>
                            {pokemon.stats.map((stat, index) => <><dt key={index}>{stat.stat.name}</dt><dd>{stat.base_stat  }</dd></>)}
                        </dl>
                    </div>
                </div>
            </div>
         );
    }
}

export default PokemonDetails;