import React from 'react';
import PokemonList from '../components/PokemonList';

const PokemonListPage = () => {
    return (
        <div id="pokemons">
            <h1>Liste des Pokémons</h1>
            <a href="/pokedex">Accéder au pokédex</a>
            <PokemonList />
        </div>
    );
}

export default PokemonListPage;
