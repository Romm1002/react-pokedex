import React from 'react';
import PokemonList from '../components/PokemonList';
import { Link } from 'react-router-dom';

const PokemonListPage = () => {
    return (
        <div className="pokemons">
            <div className='nav'>
                <h1 id="title">Liste des Pokémons</h1>
                <Link to="/pokedex">
                    <img src="https://www.pokepedia.fr/images/1/10/LogoProjetPok%C3%A9dex.png" alt="Accéder au Pokédex" width="40px" title="Accéder au Pokédex" />
                </Link>
            </div>
            <PokemonList />
        </div>
    );
}

export default PokemonListPage;
