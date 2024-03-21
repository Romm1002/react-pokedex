import React from 'react';

const PokemonCard = ({ pokemon }) => {
    return (
        <div>
            <img src={pokemon.forms.sprites.front_default}/>
            <div>
                <h3>{pokemon.name} #{pokemon.id}</h3>
                <ul>
                    {pokemon.types.map((type, index) => <li key={index}>{type.type.name}</li>)}
                </ul>
                <button>Ajouter au Pokédex</button>
            </div>
        </div>
    );
}

export default PokemonCard;
