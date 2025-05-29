import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import PasswordStrengthMeter from './PasswordStrengthMeter.jsx';

const VaultModal = ({ isOpen, onClose, onSave, editingItem }) => {
  // form data
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    website: '',
    type: 'login',
    notes: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // reset form data when modal is opened or closed
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        name: '',
        username: '',
        password: '',
        website: '',
        type: 'login',
        notes: ''
      });
    }
  }, [editingItem, isOpen]);
  
  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // simulate API call
    // this is a temporary solution until we have a real API
    // it will be replaced with an actual API call in the future
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // save the form data
    // if it's an existing item, update it, otherwise create a new one
    onSave({
      ...formData,
      id: editingItem?.id || Date.now().toString()
    });
    setIsLoading(false);
    onClose();
  };
  
  // generate a random password and save it to the form data
  // this is a utility function used when the user clicks the "Generate Password" button
  const generateRandomPassword = () => {
    // possible characters used in the password
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    // generate a 16 character password
    let password = '';
    for (let i = 0; i < 16; i++) {
      // randomly select a character from the list of possible characters
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // save the generated password to the form data
    setFormData({ ...formData, password });
  };
  
  if (!isOpen) return null;
  

  return (
    // modal container with backdrop and form 
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 backdrop-blur-lg"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />

      {/* modal content */}

      <div 
        className="relative w-full max-w-md rounded-xl shadow-2xl border backdrop-blur-lg transform transition-all duration-300 scale-100"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)'
        }}
      >
        {/* modal header with close button and title */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text)' }}>
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </h2>

          {/* form for adding and editing item */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border transition-colors"
                style={{ 
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)'
                }}
              >
                <option value="login">Login</option>
                <option value="card">Card</option>
                <option value="note">Secure Note</option>
              </select>
            </div>

            {/* form fields */}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border transition-colors"
                style={{ 
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)'
                }}
                required
              />
            </div>
            
            {/* conditional fields based on type */}

            {formData.type === 'login' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border transition-colors"
                    style={{ 
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)'
                    }}
                  />
                </div>
                
                {/* password field */}

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 pr-20 rounded-lg border transition-colors"
                      style={{ 
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text)'
                      }}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1 rounded"
                        style={{ color: 'var(--color-textSecondary)' }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        type="button"
                        onClick={generateRandomPassword}
                        className="p-1 rounded"
                        style={{ color: 'var(--color-primary)' }}
                        title="Generate password"
                      >
                        <Shield size={16} />
                      </button>
                    </div>
                  </div>
                  {formData.password && <PasswordStrengthMeter password={formData.password} />}
                </div>
                
                {/* website field */}

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border transition-colors"
                    style={{ 
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)'
                    }}
                    placeholder="https://example.com"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border transition-colors resize-none"
                style={{ 
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)'
                }}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg border transition-colors"
                style={{ 
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  color: 'white'
                }}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VaultModal;