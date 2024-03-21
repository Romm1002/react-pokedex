import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import axios from 'axios';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const limit = 20;

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const {data: {results : pokemonsData}} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
                setPokemons(pokemonsData);

                const pokemonDataList = [];
                await Promise.all(pokemonsData.map(async (pokemon) => {
                    try {
                        const {data: pokemonData} = await axios.get(pokemon.url);
                        const {data: pokemonFormData} = await axios.get(pokemonData.forms[0].url);
                        pokemonData.forms = pokemonFormData;
                        pokemonDataList.push(pokemonData);
                    } catch (error) {
                        console.error('Error fetching pokemons:', error);
                    }
                }));
                setPokemons(pokemonDataList);
                console.log(pokemonDataList)
                setLoading(false)
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
    if (loading) {
        return (
            <p>Chargement...</p>
        )
    } else {
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
}

export default PokemonList;
