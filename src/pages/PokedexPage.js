import React from 'react';
import Pokedex from '../components/Pokedex';
import { Link } from 'react-router-dom';

const PokedexPage = () => {
    return (
        <div id='pokedex'>
            <Link to="/">Accéder a la liste</Link>
            <h1>Mon Pokédex</h1>
            <Pokedex />
        </div>
    );
}

export default PokedexPage;
