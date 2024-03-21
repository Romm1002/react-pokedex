import React from 'react';

const PokedexCard = ({ pokemon, removeFromPokedex }) => {
    return (
        <div>
            <h3>{pokemon.name}</h3>
            <button onClick={() => removeFromPokedex(pokemon)}>Retirer du Pokédex</button>
        </div>
    );
}

export default PokedexCard;
