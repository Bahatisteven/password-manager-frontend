import React, { useState, useEffect } from 'react';
import { themes } from '../utils/themeConfig.js';

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('Password Manager');
  
  const theme = themes[currentTheme];
  
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, theme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext , ThemeProvider};