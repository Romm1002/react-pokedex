import React from 'react';

const PokemonCard = ({ pokemon }) => {
    return (
        <div>
            <h3>{pokemon.name}</h3>
            <button>Ajouter au Pokédex</button>
        </div>
    );
}

export default PokemonCard;
