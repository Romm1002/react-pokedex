import React from 'react';
import Pokedex from '../components/Pokedex';
import { Link } from 'react-router-dom';

const PokedexPage = () => {
    return (
        <div className='pokemons'>
            <div className='nav'>
                <h1 id="title">Mon Pokédex</h1>
                <Link to="/">
                    <img src="https://www.pokepedia.fr/images/1/10/LogoProjetPok%C3%A9dex.png" alt="Accéder au Pokédex" width="40px" title="Accéder au Pokémons" />
                </Link>
            </div>
            <Pokedex />
        </div>
    );
}

export default PokedexPage;
