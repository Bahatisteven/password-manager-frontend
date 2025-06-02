import { useState, useEffect } from 'react';

const themes = {
  bitwarden: 'Bitwarden',
  midnight: 'Midnight Purple',
  slate: 'Slate Gray'
};

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'bitwarden';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (currentTheme === 'bitwarden') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', currentTheme);
    }
    
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const switchTheme = (theme) => {
    setCurrentTheme(theme);
  };

  return {
    currentTheme,
    switchTheme,
    themes
  };
};