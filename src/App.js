// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PokemonListPage from './pages/PokemonListPage';
import PokedexPage from './pages/PokedexPage';
import PokemonPage from './pages/PokemonPage';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route exact path="/" element={<PokemonListPage />} />
              <Route path="/pokedex" element={<PokedexPage />} />
              <Route path="/:id" element={<PokemonPage />} />
          </Routes>
      </Router>
  );
}



export default App; 
