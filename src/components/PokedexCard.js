import axios from 'axios';
import React, { useState, useEffect } from 'react';

const PokedexCard = ({ pokemon, removeFromPokedex }) => {

    return (
        <div className='pokedex-pokemon'>
            {pokemon && (
                <div>
                    <h3>{pokemon.name} #{pokemon.id}</h3>
                    <button onClick={() => removeFromPokedex(pokemon)}>Retirer du Pokédex</button>
                </div>
            )}
        </div>
    );
}

export default PokedexCard;
