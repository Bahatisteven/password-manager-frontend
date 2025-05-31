import React, { useState } from 'react';
import { Palette, ChevronDown, Check } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext.jsx';

const ThemeSwitcher = () => {
  // grab the current theme and the setter function from the theme context
  const { currentTheme, setCurrentTheme, themes } = React.useContext(ThemeContext);
  
  // a state to store the opened state of the dropdown
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      {/* button to toggle the dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)'
        }}
      >
        {/* show the palette icon */}
        <Palette size={16} />
        {/* show the current theme name */}
        <span className="text-sm font-medium">{themes[currentTheme]?.name}</span>
        {/* show the chevron icon */}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* if the dropdown is open, show the theme list */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 py-2 rounded-lg shadow-xl border backdrop-blur-lg z-50 min-w-full"
          style={{ 
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)'
          }}
        >
          {/* loop through the themes and show each one */}
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => {
                // set the current theme to the selected one
                setCurrentTheme(key);
                // close the dropdown
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-opacity-50 transition-colors flex items-center gap-2"
              style={{ color: 'var(--color-text)' }}
            >
              {/* show the check icon if the theme is the current one */}
              {currentTheme === key && <Check size={14} style={{ color: 'var(--color-primary)' }} />}
              {/* show the theme name */}
              <span className={currentTheme !== key ? 'ml-6' : ''}>{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;