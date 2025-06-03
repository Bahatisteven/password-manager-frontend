import React from 'react';

/**
 * SearchBar component allows users to search through vault items and add new items.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.searchTerm - Current search term
 * @param {function} props.onSearchChange - Callback function to handle search term change
 * @param {function} props.onAddNew - Callback function to handle adding a new item
 */
const SearchBar = ({ searchTerm, onSearchChange, onAddNew }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="relative flex-1">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-bw-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search vault..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-bw-border rounded-lg bg-bw-surface text-bw-text placeholder-bw-text-secondary focus:ring-2 focus:ring-bw-primary focus:border-transparent transition-all duration-200"
        />
      </div>
      {/* Add new item button */}
      <button
        onClick={onAddNew}
        className="ripple-effect inline-flex items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-bw-primary hover:bg-bw-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bw-primary transition-all duration-200 hover:scale-105"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Item
      </button>
    </div>
  );
};

export default SearchBar;