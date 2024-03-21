import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';

const Pokedex = () => {
    // État local pour stocker les données du Pokédex
    const [pokedexData, setPokedexData] = useState([]);
    // État local pour stocker les résultats de la recherche
    const [searchResults, setSearchResults] = useState([]);

    // Effet pour charger les données du Pokédex depuis le localStorage au chargement du composant
    useEffect(() => {
        // Récupération des données du Pokédex depuis le localStorage
        const currentPokedexData = localStorage.getItem('pokedexData');
        if (currentPokedexData) {
            setPokedexData(JSON.parse(currentPokedexData));
        }
    }, []);


    // Fonction de recherche
    const handleSearch = (searchTerm) => {
        // Filtrer les Pokémon qui correspondent au terme de recherche
        const results = pokedexData.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Mettre à jour les résultats de la recherche
        setSearchResults(results);
    };



    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <div className='pokedex-pokemons'>
                {searchResults.length > 0 ? (
                    searchResults.map((pokemon, index) => (
                        <PokemonCard key={index} pokemon={pokemon} setPokedexData={setPokedexData} />
                    ))
                ) : (
                    pokedexData.map((pokemon, index) => (
                        <PokemonCard key={index} pokemon={pokemon} setPokedexData={setPokedexData} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Pokedex;
