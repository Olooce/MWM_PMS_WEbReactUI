import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch, handleShowAllEmployees }) => (
    <div className="search-bar">
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees..."
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleShowAllEmployees}>All Employees</button>
    </div>
);

export default SearchBar;
