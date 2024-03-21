import React, { useState, useEffect } from 'react';
import PokedexCard from './PokedexCard';
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

    // Fonction pour retirer un Pokémon du Pokédex
    const removeFromPokedex = (pokemonToRemove) => {
        // Filtrer le Pokémon à retirer du Pokédex
        const updatedPokedexData = pokedexData.filter(p => p.name !== pokemonToRemove.name);

        // Mettre à jour l'état local avec les données du Pokédex mises à jour
        setPokedexData(updatedPokedexData);

        // Mise à jour du localStorage avec les données du Pokédex mises à jour
        localStorage.setItem('pokedexData', JSON.stringify(updatedPokedexData));

        // Mettre à jour l'état ou effectuer toute autre logique nécessaire après le retrait du Pokémon
    };

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
            {searchResults.length > 0 ? (
                searchResults.map((pokemon, index) => (
                    <PokedexCard key={index} pokemon={pokemon} removeFromPokedex={removeFromPokedex} />
                ))
            ) : (
                pokedexData.map((pokemon, index) => (
                    <PokedexCard key={index} pokemon={pokemon} removeFromPokedex={removeFromPokedex} />
                ))
            )}
        </div>
    );
}

export default Pokedex;
