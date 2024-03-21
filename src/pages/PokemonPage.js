import React from 'react';
import { useParams } from 'react-router-dom';
import PokemonDetails from '../components/PokemonDetails';

const PokemonPage = () => {
    const { id } = useParams();
    return (
        <div>
            <PokemonDetails id={id}/>
        </div>
    );
}

export default PokemonPage;
