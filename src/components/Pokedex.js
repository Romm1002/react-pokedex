import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";

const Pokedex = () => {
  const [pokedexData, setPokedexData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    // Récupération des données du Pokédex depuis le localStorage
    const currentPokedexData = localStorage.getItem("pokedexData");
    if (currentPokedexData) {
      setPokedexData(JSON.parse(currentPokedexData));
    }
  }, []);

  // Filtrer les résultats de recherche
  useEffect(() => {
    const results = pokedexData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, pokedexData]);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(searchResults.length / pageSize);

  // Pagination des résultats de recherche
  const paginatedResults = searchResults.slice(page * pageSize, page * pageSize + pageSize);

  // Fonction pour changer de page
  const changePage = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  // Supprimer toutes les données du localStorage liées au Pokédex
  const deleteAll = () => {
    localStorage.removeItem("pokedexData");
    setPokedexData([]);
  };

  return (
    <div>
      <div className="searchBar">
        <SearchBar value={searchTerm} onSearch={setSearchTerm} />
      </div>
      <button onClick={deleteAll} className="btn btn-warning mb-3">Vider le pokédex</button>
      <div className="pokemons-list">
        {searchTerm ? (
          paginatedResults.length > 0 ? (
            paginatedResults.map((pokemon) => (
              <PokemonCard pokemon={pokemon} key={pokemon.id} />
            ))
          ) : (
            <div>Aucun Pokémon</div>
          )
        ) : (
          pokedexData.slice(page * pageSize, page * pageSize + pageSize).map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))
        )}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => changePage(page - 1)} disabled={page === 0}>
              Précédent
            </button>
          </li>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <li className={`page-item ${pageNumber === page ? 'active' : ''}`} key={pageNumber}>
              <button className="page-link" onClick={() => changePage(pageNumber)}>
                {pageNumber + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={() => changePage(page + 1)} disabled={page === totalPages - 1}>
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pokedex;
