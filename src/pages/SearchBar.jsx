import React from 'react';
import '../styles/searchBarStyling.css'
const SearchBar = ({ searchTerm, setSearchTerm, handleSearch,handleExportSearch,handleExportTable, handleAddEmployee }) => (
    <div className="search-bar">
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees..."
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleExportSearch}>Export Search Results</button>
        <button onClick={handleExportTable}>Export Table</button>
        <button className='show-all-button' onClick={handleAddEmployee}>Add Employee</button>
    </div>
);

export default SearchBar;
