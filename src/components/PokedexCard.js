import React, { useState, useEffect } from 'react';

const PokedexCard = ({ pokemon, removeFromPokedex }) => {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        // Récupérer les données du Pokémon à partir de son URL
        const fetchData = async () => {
            try {
                // Données du Pokémon
                const response = await fetch(pokemon.url);
                const data = await response.json();

                setPokemonData(data);
            } catch (error) {
                console.log('Error fetching pokemon data:', error);
            }
        };

        fetchData();
    }, [pokemon.url]);

    return (
        <div className='pokedex-pokemon'>
            {pokemonData && (
                <div>
                    <h3>{pokemon.name} #{pokemonData.id}</h3>
                    <button onClick={() => removeFromPokedex(pokemon)}>Retirer du Pokédex</button>
                </div>
            )}
        </div>
    );
}

export default PokedexCard;
