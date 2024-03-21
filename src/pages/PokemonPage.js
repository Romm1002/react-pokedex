import { useParams } from 'react-router-dom';
import PokemonDetails from '../components/PokemonDetails';

const PokemonPage = () => {
    const { id } = useParams();
    return (
        <div id='pokemon'>
            <PokemonDetails id={id}/>
        </div>
    );
}

export default PokemonPage;
