// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const lightColors = {
    background: '#FFFFFF',
    text: '#2A2F4F',
    card: '#F8F9FA',
    primary: '#4ECDC4',
    danger: '#FF6B6B',
  };

  const darkColors = {
    background: '#1A1D2E',
    text: '#FFFFFF',
    card: '#2A2F4F',
    primary: '#3BA89E',
    danger: '#E84545',
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ colors: isDark ? darkColors : lightColors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);