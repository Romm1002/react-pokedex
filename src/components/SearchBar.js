// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = event => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        onSearch(searchTerm);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={searchTerm} onChange={handleChange} />
            <button type="submit">Rechercher</button>
        </form>
    );
}

export default SearchBar;
