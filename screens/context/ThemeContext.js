// context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      text: isDark ? '#FFFFFF' : '#1A1A1A',
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      card: isDark ? '#2D2D2D' : '#F8F9FA',
      border: isDark ? '#404040' : '#E9ECEF',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);