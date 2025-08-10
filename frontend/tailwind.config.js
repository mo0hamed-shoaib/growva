/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Phoenix Brand Colors
        'phoenix': {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F25C1C', // Primary
          600: '#F47A2E', // Secondary
          700: '#C44714', // Deep
          800: '#9A3412',
          900: '#7C2D12',
        },
        // Dark Mode Colors (from moodboard)
        'dark': {
          'bg': '#0A0A0A',
          'surface': '#1E1E1E',
          'border': '#27272A',
          'hover': '#2A2A2A',
          'active': '#3A3A3A',
        },
        // Light Mode Colors (from moodboard)
        'light': {
          'bg': '#F8FAFC',
          'surface': '#FFFFFF',
          'border': '#E5E7EB',
          'hover': '#F1F5F9',
          'active': '#E2E8F0',
        }
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      backgroundImage: {
        'phoenix-gradient': 'linear-gradient(90deg, #F25C1C, #F47A2E)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'large': '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
