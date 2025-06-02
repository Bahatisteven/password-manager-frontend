import React, { useState, useEffect } from 'react';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const VaultModal = ({ item, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    uri: '',
    notes: '',
    folder: '',
    favorite: false,
    type: 'login'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        name: '',
        username: '',
        password: '',
        uri: '',
        notes: '',
        folder: '',
        favorite: false,
        type: 'login'
      });
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave(formData);
    setIsLoading(false);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, password });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
        
        <div className="inline-block align-bottom glassmorphism rounded-lg text-left overflow-hidden shadow-xl transform transition-all duration-300 animate-slide-up sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit} className="bg-bw-bg px-6 pt-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-bw-text">
                {item ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-bw-text-secondary hover:text-bw-text transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-bw-text mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-bw-border rounded-lg bg-bw-surface text-bw-text focus:ring-2 focus:ring-bw-primary focus:border-transparent"
                >
                  <option value="login">Login</option>
                  <option value="secure-note">Secure Note</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-bw-text mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-bw-border rounded-lg bg-bw-surface text-bw-text focus:ring-2 focus:ring-bw-primary focus:border-transparent"
                  placeholder="Enter item name"
                />
              </div>

              {formData.type === 'login' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-bw-text mb-1">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full px-3 py-2 pr-10 border border-bw-border rounded-lg bg-bw-surface text-bw-text focus:ring-2 focus:ring-bw-primary focus:border-transparent"
                        placeholder="Enter username"
                      />
                      <button
                        type="button"
                        onClick={() => copyToClipboard(formData.username)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-bw-text-secondary hover:text-bw-text"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bw-text mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-3 py-2 pr-20 border border-bw-border rounded-lg bg-bw-surface text-bw-text focus:ring-2 focus:ring-bw-primary focus:border-transparent"
                        placeholder="Enter password"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-bw-text-secondary hover:text-bw-text"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {showPassword ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878L8.464 8.464" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            )}
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(formData.password)}
                          className="text-bw-text-secondary hover:text-bw-text"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <PasswordStrengthMeter password={formData.password} />
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="mt-2 text-sm text-bw-primary hover:text-bw-secondary transition-colors duration-200"
                    >
                      Generate Password
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bw-text mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.uri}
                      onChange={(e) => setFormData({ ...formData, uri: e.target.value })}
                      className="w-full px-3 py-2 border border-bw-border rounded-lg bg-bw-surface text-bw-text focus:ring-2 focus:ring-bw-primary focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-bw-text mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-bw-border rounded-lg bg-bw-surface text-bw-text focus:ring-2 focus:ring-bw-primary focus:border-transparent"
                  placeholder="Add notes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-bw-text mb-1">
                  Folder
                </label>
                <select
                  value={formData.folder}
                  onChange={(e) => setFormData({ ...formData, folder: e.target.value })}
                  className="w-full px-3 py-2 border border-bw-border rounded-lg bg-bw-surface text-bw-text focus:ring-2 focus:ring-bw-primary focus:border-transparent"
                >
                  <option value="">No Folder</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Finance">Finance</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  id="favorite"
                  type="checkbox"
                  checked={formData.favorite}
                  onChange={(e) => setFormData({ ...formData, favorite: e.target.checked })}
                  className="h-4 w-4 text-bw-primary focus:ring-bw-primary border-bw-border rounded"
                />
                <label htmlFor="favorite" className="ml-2 block text-sm text-bw-text">
                  Add to favorites
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-bw-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-bw-text-secondary bg-bw-surface hover:bg-bw-hover border border-bw-border rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="ripple-effect px-4 py-2 text-sm font-medium text-white bg-bw-primary hover:bg-bw-secondary disabled:opacity-50 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                {isLoading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <span>{isLoading ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VaultModal;