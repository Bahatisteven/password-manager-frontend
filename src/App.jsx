import React, { useState, useEffect, useMemo } from 'react';
import VaultItem from './components/VaultItems.jsx';
import SearchBar from './components/SearchBar.jsx';
import VaultModal from './components/VaultModal.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import LoadingSkeleton from './components/LoadingSkeleton.jsx';
import { mockVaultItems } from './data/mockData.js';
import './styles/globals.css';

function App() {
  const [vaultItems, setVaultItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVaultItems(mockVaultItems);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    return vaultItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uri?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vaultItems, searchTerm]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (editingItem) {
      setVaultItems(items =>
        items.map(item =>
          item.id === editingItem.id ? { ...formData, id: editingItem.id } : item
        )
      );
    } else {
      const newItem = {
        ...formData,
        id: Date.now().toString()
      };
      setVaultItems(items => [...items, newItem]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
    setSelectedItem(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-bw-bg transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-bw-text">Password Vault</h1>
            <p className="text-bw-text-secondary mt-1">
              Secure password management made simple
            </p>
          </div>
          <ThemeSwitcher />
        </div>

        {/* Search and Add */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddNew={handleAddNew}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-bw-surface border border-bw-border rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-bw-text-secondary">Total Items</p>
                <p className="text-2xl font-bold text-bw-text">{vaultItems.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-bw-surface border border-bw-border rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-bw-text-secondary">Favorites</p>
                <p className="text-2xl font-bold text-bw-text">
                  {vaultItems.filter(item => item.favorite).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-bw-surface border border-bw-border rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-bw-text-secondary">Secure</p>
                <p className="text-2xl font-bold text-bw-text">100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vault Items */}
        <div className="bg-bw-surface border border-bw-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-bw-text mb-4">
            Your Vault ({filteredItems.length} items)
          </h2>
          
          {isLoading ? (
            <LoadingSkeleton count={5} />
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-bw-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-bw-text">No items found</h3>
              <p className="mt-1 text-sm text-bw-text-secondary">
                {searchTerm ? 'Try adjusting your search term.' : 'Get started by adding your first password.'}
              </p>
              {!searchTerm && (
                <div className="mt-6">
                  <button
                    onClick={handleAddNew}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-bw-primary hover:bg-bw-secondary"
                  >
                    Add your first item
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <VaultItem
                  key={item.id}
                  item={item}
                  onClick={handleItemClick}
                  isSelected={selectedItem?.id === item.id}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        <VaultModal
          item={editingItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

export default App;