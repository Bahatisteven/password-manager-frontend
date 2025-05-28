import React, { useState } from 'react';
import { Key, CreditCard, StickyNote, Shield, Copy, Edit, Trash2, Eye, EyeOff, Check } from 'lucide-react';

// vault item component
const VaultItem = ({ item, onEdit, onDelete, isSelected, onClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(null);
  
 // function to copy text to clipboard 
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
 
  // function to get the icon based on item type
  const getItemIcon = () => {
    switch (item.type) {
      case 'login': return <Key size={20} style={{ color: 'var(--color-primary)' }} />;
      case 'card': return <CreditCard size={20} style={{ color: 'var(--color-accent)' }} />;
      case 'note': return <StickyNote size={20} style={{ color: 'var(--color-secondary)' }} />;
      default: return <Shield size={20} style={{ color: 'var(--color-primary)' }} />;
    }
  };
  
  return (
    // main item container 

    <div
      onClick={onClick}
      className={`p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
        isSelected ? 'ring-2 ring-opacity-50' : ''
      }`}
      style={{ 
        backgroundColor: isSelected ? 'var(--color-surfaceHover)' : 'var(--color-surface)',
        borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
        ringColor: 'var(--color-primary)'
      }}
    >
      { /* item header with icon and title */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {getItemIcon()} 
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate" style={{ color: 'var(--color-text)' }}>
              {item.name}
            </h3>
            <p className="text-sm truncate" style={{ color: 'var(--color-textSecondary)' }}>
              {item.username || item.cardNumber || 'Secure note'}
            </p>
          </div>
        </div>
        
        {/* action buttons for copy, edit, delete */}

        <div className="flex items-center gap-2">
          {item.type === 'login' && (
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(item.username, 'username');
                }}
                className="p-2 rounded-md transition-colors hover:bg-opacity-10"
                style={{ 
                  backgroundColor: copied === 'username' ? 'var(--color-success)' : 'transparent',
                  color: copied === 'username' ? 'white' : 'var(--color-textSecondary)'
                }}
                title="Copy username"
              >
                {copied === 'username' ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(item.password, 'password');
                }}
                className="p-2 rounded-md transition-colors hover:bg-opacity-10"
                style={{ 
                  backgroundColor: copied === 'password' ? 'var(--color-success)' : 'transparent',
                  color: copied === 'password' ? 'white' : 'var(--color-textSecondary)'
                }}
                title="Copy password"
              >
                {copied === 'password' ? <Check size={16} /> : <Key size={16} />}
              </button>
            </div>
          )}
          {/* edit and delete buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
            className="p-2 rounded-md transition-colors"
            style={{ color: 'var(--color-textSecondary)' }}
            title="Edit item"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="p-2 rounded-md transition-colors"
            style={{ color: 'var(--color-danger)' }}
            title="Delete item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {/* item details section */}

      {isSelected && item.type === 'login' && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                Password:
              </span>
              <span className="text-sm font-mono" style={{ color: 'var(--color-text)' }}>
                {showPassword ? item.password : '••••••••'}
              </span>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 rounded"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {item.website && (
              <div className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>
                Website: {item.website}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultItem;