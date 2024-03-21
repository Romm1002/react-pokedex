import React, { useState, useEffect } from 'react';

const PokemonCard = ({ pokemon }) => {
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

    // Ajouter le Pokémon au Pokédex (localStorage)
    const addPokedex = () => {
        // Récupération des données actuelles du Pokédex depuis le localStorage
        const currentPokedexData = localStorage.getItem('pokedexData');
        let pokedexData = currentPokedexData ? JSON.parse(currentPokedexData) : [];

        // Ajout du Pokémon à la liste du Pokédex
        pokedexData.push(pokemon);

        // Mise à jour du localStorage avec les données du Pokédex mises à jour
        localStorage.setItem('pokedexData', JSON.stringify(pokedexData));
    };

    return (
        <div>
            {pokemonData && (
                <div>
                    <h3>{pokemonData.name}</h3>
                    <button onClick={addPokedex}>Ajouter au pokédex</button>
                </div>
            )}
        </div>
    );
}

export default PokemonCard;
