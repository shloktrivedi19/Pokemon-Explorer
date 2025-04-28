import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import Searchbar from './components/Searchbar';
import PokemonCard from './components/PokemonCard';
import ClipLoader from 'react-spinners/ClipLoader';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const data = await response.json();
      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const detailedPokemon = await res.json();
          return detailedPokemon;
        })
      );
      setPokemons(detailedData);
      setLoading(false);
    }
    fetchPokemons();
  }, []);

  useEffect(() => {
    async function fetchTypes() {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      setTypes(data.results.map((type) => type.name));
    }
    fetchTypes();
  }, []);

  const filteredPokemons = useMemo(() => {
    const lowercasedSearch = searchTerm.toLowerCase();
    return pokemons.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().startsWith(lowercasedSearch); // Only "starts with" match
      const matchesType = selectedType ? pokemon.types.some((type) => type.type.name === selectedType) : true;
      return matchesName && matchesType;
    });
  }, [pokemons, searchTerm, selectedType]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Router>
      <div className="App">
        <h1 className="header">Pokemon Explorer</h1>

        <div className="search-type-container">
          <Searchbar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            selectedType={selectedType}
            onTypeChange={(e) => setSelectedType(e.target.value)}
            types={types}
          />
        </div>

        <div className="pokemon-container">
          {loading ? (
            <div className="loading-container">
              <ClipLoader color="#36d7b7" loading={loading} size={50} />
            </div>
          ) : filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          ) : (
            <p className="no-results">No Pokemon found!</p>
          )}
        </div>

        <footer className="footer">
          <p className="footer-name">
            Created & Developed with <span role="img" aria-label="heart">❤️</span> by <span className="spotlight">Shlok Trivedi</span>
            <a href="https://github.com/shloktrivedi19" target="_blank" rel="noopener noreferrer">
              <FaGithub className="github-icon" />
            </a>
          </p>
          <div className="mini-projects">
            <a href="https://shloktrivedi19.github.io/Minesweeper/" target="_blank" rel="noopener noreferrer">
              Minesweeper
            </a>
            <a href="https://shloktrivedi19.github.io/Tic-Tac-Toe/" target="_blank" rel="noopener noreferrer">
              Tic Tac Toe
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
