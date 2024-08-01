import React from 'react';
import '../styles/searchBarStyling.css';

const SearchBar = ({
    searchTerm,
    setSearchTerm,
    handleSearch,
    isSearching,
    handleExportSearch,
    handleExportTable,
    handleAddEmployee
}) => (
    <div className="search-bar">
        <div className="cont">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search employees..."
            />
        </div>
        <button onClick={handleSearch}>Search</button>
        {isSearching && <button onClick={handleExportSearch}>Export Search Results</button>}
        <button onClick={handleExportTable}>Export Table</button>
        <button className="show-all-button" onClick={handleAddEmployee}>Add Employee</button>
    </div>
);

export default SearchBar;

