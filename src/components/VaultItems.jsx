import React from 'react';

const VaultItem = ({ item, onClick, isSelected }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'login':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.243-6.243A6 6 0 0121 9z" />
          </svg>
        );
      case 'secure-note':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
    }
  };

  return (
    <div
      onClick={() => onClick(item)}
      className={`ripple-effect group cursor-pointer p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
        isSelected 
          ? 'border-bw-primary bg-bw-primary/5 shadow-lg' 
          : 'border-bw-border bg-bw-surface hover:bg-bw-hover'
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-lg transition-colors duration-200 ${
          isSelected ? 'bg-bw-primary text-white' : 'bg-bw-primary/10 text-bw-primary'
        }`}>
          {getIcon(item.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-bw-text truncate">{item.name}</h3>
            {item.favorite && (
              <svg className="w-4 h-4 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
          </div>
          <p className="text-xs text-bw-text-secondary truncate">
            {item.username || item.notes || 'No additional details'}
          </p>
          {item.uri && (
            <p className="text-xs text-bw-accent truncate mt-1">{item.uri}</p>
          )}
        </div>
        
        <div className="flex flex-col items-end space-y-1">
          {item.folder && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-bw-accent/10 text-bw-accent">
              {item.folder}
            </span>
          )}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg className="w-4 h-4 text-bw-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultItem;