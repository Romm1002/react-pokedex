// PokedexCard.js
import React from 'react';

const PokedexCard = ({ pokemon }) => {
    return (
        <div>
            <h3>{pokemon.name}</h3>
            <p>Numéro: {pokemon.number}</p>
            <p>Types: {pokemon.types.join(', ')}</p>
            <img src={pokemon.image} alt={pokemon.name} />
            <button>Retirer du Pokédex</button>
        </div>
    );
}

export default PokedexCard;
