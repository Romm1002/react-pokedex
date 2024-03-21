// Pokedex.js
import React, { useState, useEffect } from 'react';
import PokedexCard from './PokedexCard';

const Pokedex = () => {
    const [pokedex, setPokedex] = useState([]);

    useEffect(() => {
        // Code pour récupérer les données du localStorage et les mettre à jour avec setPokedex
    }, []);

    return (
        <div>
            {pokedex.map(pokemon => (
                <PokedexCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
}

export default Pokedex;
