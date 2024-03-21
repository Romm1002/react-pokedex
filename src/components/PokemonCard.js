const PokemonCard = ({ pokemon, setPokedexData }) => {
    const addPokedex = () => {
        const currentPokedexData = localStorage.getItem('pokedexData');
        let pokedexData = currentPokedexData ? JSON.parse(currentPokedexData) : [];

        pokedexData.push(pokemon);

        localStorage.setItem('pokedexData', JSON.stringify(pokedexData));
    };

    
    const removeFromPokedex = (pokemonToRemove) => {
        const pokedexData = JSON.parse(localStorage.getItem('pokedexData'));
        
        const updatedPokedexData = pokedexData.filter(p => p.name !== pokemonToRemove.name);

        setPokedexData(updatedPokedexData);

        localStorage.setItem('pokedexData', JSON.stringify(updatedPokedexData));

    };

    return (
        <div>
            <img src={pokemon.forms.sprites.front_default} alt={pokemon.name}/>
            <div>
                <h3>{pokemon.name} #{pokemon.id}</h3>
                <ul>
                    {pokemon.types.map((type, index) => <li key={index}>{type.type.name}</li>)}
                </ul>
                {setPokedexData === undefined ?(
                    <button onClick={addPokedex}>Ajouter au Pokédex</button>
                ) : (
                    <button onClick={() => removeFromPokedex(pokemon)}>Retirer du Pokédex</button>
                )}
            </div>
        </div>
    );
}

export default PokemonCard;
