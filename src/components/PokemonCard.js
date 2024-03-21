const PokemonCard = ({ pokemon }) => {

    // Ajouter le Pokémon au Pokédex (localStorage)
    const addPokedex = () => {
        // Récupération des données actuelles du Pokédex depuis le localStorage
        const currentPokedexData = localStorage.getItem('pokedexData');
        let pokedexData = currentPokedexData ? JSON.parse(currentPokedexData) : [];

        // Ajout du Pokémon à la liste du Pokédex
        pokedexData.push(pokemon);

        // Mise à jour du localStorage avec les données du Pokédex mises à jour
        localStorage.setItem('pokedexData', JSON.stringify(pokedexData));
    };

    return (
        <div>
            <img src={pokemon.forms.sprites.front_default} alt={pokemon.name}/>
            <div>
                <h3>{pokemon.name} #{pokemon.id}</h3>
                <ul>
                    {pokemon.types.map((type, index) => <li key={index}>{type.type.name}</li>)}
                </ul>
                <button onClick={addPokedex}>Ajouter au Pokédex</button>
            </div>
        </div>
    );
}

export default PokemonCard;
