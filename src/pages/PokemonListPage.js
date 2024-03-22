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
            {/* <a href="#title" id="top">
                <img src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-keyboard-arrow-up_90748.png" alt="Retour en haut" title="Revenir au début" width="50px" />
            </a> */}
        </div>
    );
}

export default PokemonListPage;
