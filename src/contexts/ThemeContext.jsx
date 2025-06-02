import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeSwitcher = () => {
  const { currentTheme, switchTheme, themes } = useTheme();

  return (
    <div className="relative">
      <select
        value={currentTheme}
        onChange={(e) => switchTheme(e.target.value)}
        className="appearance-none bg-bw-surface border border-bw-border rounded-lg px-4 py-2 pr-8 text-bw-text focus:ring-2 focus:ring-bw-primary focus:border-transparent transition-all duration-200 hover:shadow-md"
      >
        {Object.entries(themes).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-bw-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default ThemeSwitcher;