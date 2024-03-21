import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 20;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                const data = await response.json();
                setPokemons(data.results);
            } catch (error) {
                console.error('Error fetching pokemons:', error);
            }
        };

        fetchData();
    }, [offset]);

    const handleNextPage = () => {
        setOffset(offset + limit);
    };

    const handlePreviousPage = () => {
        if (offset - limit >= 0) {
            setOffset(offset - limit);
        }
    };

    return (
        <div>
            {pokemons.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon} />
            ))}
            <div>
                <button onClick={handlePreviousPage}>Page précédente</button>
                <button onClick={handleNextPage}>Page suivante</button>
            </div>
        </div>
    );
}

export default PokemonList;
