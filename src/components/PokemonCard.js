import React from 'react';

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <img
        src={pokemon.sprites?.other?.['official-artwork']?.front_default || ''}
        alt={pokemon.name}
      />
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <p>ID: {pokemon.id}</p> {/* display Pokemon ID */}
      <p>Type: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}</p>
    </div>
  );
}

export default PokemonCard;
