import React from 'react';
import '../styles/searchBarStyling.css'
const SearchBar = ({ searchTerm, setSearchTerm, handleSearch, handleShowAllEmployees }) => (
    <div className="search-bar">
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees..."
        />
        <button onClick={handleSearch}>Search</button>
        <button className= 'show-all-button' onClick={handleShowAllEmployees}>All Employees</button>
    </div>
);

export default SearchBar;
