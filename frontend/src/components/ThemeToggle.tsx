import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleTheme();
    }
  };

  const isDark = theme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  return (
    <button
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className="toggle-switch focus-ring"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={isDark}
      role="switch"
      tabIndex={0}
    >
      <span className="sr-only">
        {isDark ? 'Currently in dark mode' : 'Currently in light mode'}, 
        click to switch to {nextTheme} mode
      </span>
      
      {/* Sun icon for light mode */}
      <div 
        className={`absolute left-1 flex h-4 w-4 items-center justify-center rounded-full transition-all duration-200 ${
          !isDark 
            ? 'translate-x-0 text-yellow-500' 
            : 'translate-x-5 text-transparent'
        }`}
        aria-hidden="true"
      >
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Moon icon for dark mode */}
      <div 
        className={`absolute right-1 flex h-4 w-4 items-center justify-center rounded-full transition-all duration-200 ${
          isDark 
            ? 'translate-x-0 text-blue-400' 
            : '-translate-x-5 text-transparent'
        }`}
        aria-hidden="true"
      >
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>

      {/* Toggle thumb */}
      <div 
        className={`toggle-switch-thumb ${
          isDark ? 'toggle-switch-thumb-enabled' : 'toggle-switch-thumb-disabled'
        }`}
        aria-hidden="true"
      />
    </button>
  );
};

export default ThemeToggle;
