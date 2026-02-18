/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        quantum: {
          blue: '#4F46E5',
          purple: '#7C3AED',
          pink: '#EC4899',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'quantum-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }
    },
  },
  plugins: [],
}
