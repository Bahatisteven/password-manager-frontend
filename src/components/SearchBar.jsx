import { Search, Plus } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, onAdd }) => {
  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-1 relative">
        <Search 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          style={{ color: 'var(--color-textSecondary)' }}
        />
        <input
          type="text"
          placeholder="Search vault..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
            focusRingColor: 'var(--color-primary)'
          }}
        />
      </div>
      <button
        onClick={onAdd}
        className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
        style={{ 
          backgroundColor: 'var(--color-primary)',
          color: 'white'
        }}
      >
        <Plus size={20} />
        Add Item
      </button>
    </div>
  );
};

export default SearchBar;