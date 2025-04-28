import React from 'react';

function Searchbar({ searchTerm, onSearchChange, selectedType, onTypeChange, types }) {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={onSearchChange} // user search
        style={{ padding: '8px', width: '200px', marginRight: '10px' }}
      />
      <select value={selectedType} onChange={onTypeChange} style={{ padding: '8px' }}>
        <option value="">All Types</option>
        {types && Array.isArray(types) && types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Searchbar;
