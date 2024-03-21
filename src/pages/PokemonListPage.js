import React from 'react';
import PokemonList from '../components/PokemonList';
import { Link } from 'react-router-dom';

const PokemonListPage = () => {
    return (
        <div id="pokemons">
            <Link to="/pokedex">Accéder au pokédex</Link>
            <h1>Liste des Pokémons</h1>
            <PokemonList />
        </div>
    );
}

export default PokemonListPage;
