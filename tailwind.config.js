/** @type {import('tailwindcss').Config} */

const typeColors = ['normal','rock','ground','dark', 'ghost', 'poison','psychic','fairy','fire','fighting','electric','grass','bug','steel','ice','flying','water',
'dragon']

const safeColors = typeColors.flatMap((color) => `bg-${color}`);

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  safelist: [...safeColors],
  theme: {
    extend: {
      colors: {
        'main': '#FFFFFF',
        'gray-0': '#FAFAFA',
        'gray-100': '#A9A9A9',
        'gray-200': '#7B7B7B',
        'secondary': '#000000',
        'normal': '#A9A9A9',
        'rock': '#94887C',
        'ground': '#A76427',
        'dark': '#5E413A',
        'ghost': '#742F80',
        'poison': '#9F00B9',
        'psychic': '#FB39B9',
        'fairy': '#FF87E5',
        'fire': '#F03226',
        'fighting': '#F98D29',
        'electric': '#F1D900',
        'grass': '#41D229',
        'bug': '#629422',
        'steel': '#58A6A6',
        'ice': '#00C4DF',
        'flying': '#6BBEEC',
        'water': '#0091E2',
        'dragon': '#3E51FD',
      },
      fontSize: {
        's': '8px',
        'sm': '12px',
        'm': '16px',
        'l': '24px',
      },
      spacing: {
        '0': '6px',
        '1': '8px',
        '2': '12px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '180px',
      },
      borderRadius: {
        '0': '4px',
        '1': '6px',
        '2': '8px',
        '3': '12px',
        '4': '24px',
      },
      boxShadow: {
        'gray-100': '0px 0px 6px 0px rgba(169,169,169,1)',
      },
      screens: {
        'm': '480px',
        'm': '720px',
        'l': '1024px',
        'xl': '1920px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}