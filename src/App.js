import React from 'react';
import { useState, useMemo } from 'react';
import { Search, Shield, alertCircle } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import SearchBar from './components/SearchBar.jsx';
import VaultModal from './components/VaultModal.jsx';
import LoadingSkeleton from './components/LoadingSkeleton.jsx';
import VaultItems from './components/VaultItems.js';
//import './App.css';

const App = () => {
  const [searchItem, setSearchItem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setIsLoading] = useState(false);
}


const filteredItems = useMemo(() => {
  if(!searchTerm) return VaultItems;

  return VaultItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.username && item.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.url && item.url.toLowerCase().includes(searchTerm.toLowerCase()))
  );
}, [VaultItems, SearchTerm]);


const handleAddItem = () => {}



export default App;