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
    </div>
);

export default SearchBar;

