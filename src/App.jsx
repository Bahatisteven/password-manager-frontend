import React, { useState, useMemo } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { calculatePasswordStrength } from 'shared-utils';
import LoadingSkeleton from './components/LoadingSkeleton.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import SearchBar from './components/SearchBar.jsx';
import VaultItem from './components/VaultItems.jsx';
import VaultModal from './components/VaultModal.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

const App = () => {
  const [vaultItems, setVaultItems] = useState([
    {
      id: '1',
      name: 'GitHub',
      username: 'Bahatisteven',
      password: 'MySecurePass!',
      website: 'https://github.com',
      type: 'login',
      notes: 'Main development account'
    },
    {
      id: '2',
      name: 'Banking',
      username: 'Bahatisteven',
      password: 'BankPass456$',
      website: 'https://mybank.com',
      type: 'login',
      notes: 'Primary checking account'
    },
    {
      id: '3',
      name: 'Credit Card',
      cardNumber: '**** **** **** 1234',
      type: 'card',
      notes: 'Visa ending in X'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading] = useState(false);
  
  const filteredItems = useMemo(() => {
    if (!searchTerm) return vaultItems;
    return vaultItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.username && item.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.website && item.website.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [vaultItems, searchTerm]);
  
  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };
  
  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  
  const handleSaveItem = (itemData) => {
    if (editingItem) {
      setVaultItems(items => items.map(item => 
        item.id === editingItem.id ? itemData : item
      ));
    } else {
      setVaultItems(items => [...items, itemData]);
    }
  };
  
  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setVaultItems(items => items.filter(item => item.id !== itemId));
      if (selectedItem?.id === itemId) {
        setSelectedItem(null);
      }
    }
  };
  
  return (
    <ThemeProvider>
      <div 
        className="min-h-screen transition-colors duration-300"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div className="container mx-auto px-4 py-8 max-w-4xl">

          {/* Header */}

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield size={32} style={{ color: 'var(--color-primary)' }} />
              <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                My Vault
              </h1>
            </div>
            <ThemeSwitcher />
          </div>
          
          {/* Search and Add */}

          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAdd={handleAddItem}
          />
          
          {/* Vault Items */}

          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                  <LoadingSkeleton />
                </div>
              ))
            ) : filteredItems.length === 0 ? (
              <div 
                className="text-center py-12 rounded-lg border-2 border-dashed"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <AlertCircle size={48} className="mx-auto mb-4" style={{ color: 'var(--color-textSecondary)' }} />
                <p className="text-lg font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                  {searchTerm ? 'No items found' : 'Your vault is empty'}
                </p>
                <p style={{ color: 'var(--color-textSecondary)' }}>
                  {searchTerm ? 'Try adjusting your search terms' : 'Add your first password to get started'}
                </p>
              </div>
            ) : (
              filteredItems.map(item => (
                <VaultItem
                  key={item.id}
                  item={item}
                  isSelected={selectedItem?.id === item.id}
                  onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              ))
            )}
          </div>
          
          {/* Stats */}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="p-4 rounded-lg border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                {vaultItems.length}
              </div>
              <div className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>
                Total Items
              </div>
            </div>
            <div 
              className="p-4 rounded-lg border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                {vaultItems.filter(item => item.type === 'login').length}
              </div>
              <div className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>
                Logins
              </div>
            </div>
            <div 
              className="p-4 rounded-lg border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>
                {vaultItems.filter(item => {
                  if (item.type === 'login' && item.password) {
                    const strength = calculatePasswordStrength(item.password);
                    return strength.score >= 5;
                  }
                  return false;
                }).length}
              </div>
              <div className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>
                Strong Passwords
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal */}

        <VaultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveItem}
          editingItem={editingItem}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;