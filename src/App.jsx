import React, { useState, useEffect, useMemo } from 'react';
import VaultItem from './components/VaultItems.jsx';
import SearchBar from './components/SearchBar.jsx';
import VaultModal from './components/VaultModal.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import LoadingSkeleton from './components/LoadingSkeleton.jsx';
import { fetchVaultItems, addVaultItem, updateVaultItem, deleteVaultItem } from './api.js';
import './styles/globals.css';

function App() {
  const [vaultItems, setVaultItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    isOpen: false,
    item: null,
    isDeleting: false
  });

  // fetching data from the API
  useEffect(() => {
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchVaultItems();
      setVaultItems(data);
    } catch (err) {
      console.error('Failed to fetch vault items:', err);
      setVaultItems([]);
    }
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

  // handle save action
  const handleSave = async (formData) => {
  try {
    if (editingItem) {
      // update existing item in backend
      await updateVaultItem(editingItem.id, formData);
    } else {
      // add new item to backend
      await addVaultItem(formData);
    }
    // refresh the list from backend
    const data = await fetchVaultItems();
    setVaultItems(data);
    setIsModalOpen(false);
    setEditingItem(null);
    setSelectedItem(null);
  } catch (error) {
    console.error("Failed to save vault item:", error);
    alert("Failed to save item. Please try again.");
  }
};

  // handle delete button click
  const handleDeleteClick = (item, event) => {
    // prevent triggering the item click when delete button is clicked
    event.stopPropagation();
    setDeleteConfirmModal({
      isOpen: true,
      item: item,
      isDeleting: false
    });
  };

  // handle delete confirmation
  const handleDeleteConfirm = async () => {
    const { item } = deleteConfirmModal;
    if (!item) return;

    setDeleteConfirmModal(prev => ({ ...prev, isDeleting: true }));
    
    try {
      await deleteVaultItem(item.id);
      // refresh the list from backend
      const data = await fetchVaultItems();
      setVaultItems(data);
      
      // close delete modal
      setDeleteConfirmModal({
        isOpen: false,
        item: null,
        isDeleting: false
      });
      
      // close edit modal if the deleted item was being edited
      if (selectedItem?.id === item.id) {
        setIsModalOpen(false);
        setEditingItem(null);
        setSelectedItem(null);
      }
    } catch (error) {
      console.error("Failed to delete vault item:", error);
      alert("Failed to delete item. Please try again.");
      setDeleteConfirmModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  // handle delete cancel
  const handleDeleteCancel = () => {
    setDeleteConfirmModal({
      isOpen: false,
      item: null,
      isDeleting: false
    });
  };

  // handle modal close
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
                  onDelete={handleDeleteClick}
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
          onDelete={editingItem ? (e) => handleDeleteClick(editingItem, e) : null}
        />
        {/* delete confirmation modal */}
        {deleteConfirmModal.isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={!deleteConfirmModal.isDeleting ? handleDeleteCancel : undefined}
              />
              
              <div className="inline-block align-bottom glassmorphism rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-300 animate-slide-up sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-bw-bg px-6 pt-6 pb-6">
                  <div className="flex items-center mb-4">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                      <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-bw-text mb-2">
                      Delete "{deleteConfirmModal.item?.name}"?
                    </h3>
                    <p className="text-sm text-bw-text-secondary mb-6">
                      This action cannot be undone. This will permanently delete the vault item and remove all associated data.
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleDeleteCancel}
                      disabled={deleteConfirmModal.isDeleting}
                      className="px-4 py-2 text-sm font-medium text-bw-text-secondary bg-bw-surface hover:bg-bw-hover border border-bw-border rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteConfirm}
                      disabled={deleteConfirmModal.isDeleting}
                      className="ripple-effect px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    >
                      {deleteConfirmModal.isDeleting && (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      <span>{deleteConfirmModal.isDeleting ? 'Deleting...' : 'Delete'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default App;