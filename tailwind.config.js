/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#191731',
        'ink-soft': '#191731',
        ivory: '#faf8f4',
        'ivory-2': '#f2efe8',
        bronze: '#f15f32',
        'bronze-soft': '#f15f32',
        stone: '#8d897f',
        rule: '#e3dfd5',
      },
    },
  },
  plugins: [],
};
