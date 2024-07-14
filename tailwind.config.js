/** @type {import('tailwindcss').Config} */

const typeColors = ['normal','rock','ground','dark', 'ghost', 'poison','psychic','fairy','fire','fighting','electric','grass','bug','steel','ice','flying','water',
'dragon']

const safeColors = typeColors.flatMap((color) => [`bg-${color}`, `text-${color}`]);

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  safelist: [...safeColors],
  theme: {
    extend: {
      colors: {
        /* Grays */
        'gray-0': 'var(--gray-0)',
        'gray-100': 'var(--gray-100)',
        'gray-200': 'var(--gray-200)',
        'gray-300': 'var(--gray-300)',
        'gray-400': 'var(--gray-400)',
        'gray-500': 'var(--gray-500)',
        /* Pokemons types */
        'normal': 'var(--normal)',
        'rock': 'var(--rock)',
        'ground': 'var(--ground)',
        'dark': 'var(--dark)',
        'ghost': 'var(--ghost)',
        'poison': 'var(--poison)',
        'psychic': 'var(--psychic)',
        'fairy': 'var(--fairy)',
        'fire': 'var(--fire)',
        'fighting': 'var(--fighting)',
        'electric': 'var(--electric)',
        'grass': 'var(--grass)',
        'bug': 'var(--bug)',
        'steel': 'var(--steel)',
        'ice': 'var(--ice)',
        'flying': 'var(--flying)',
        'water': 'var(--water)',
        'dragon': 'var(--dragon)',
        /* Light Themes */
        'main': 'var(--main)',
        'secondary': 'var(--secondary)',
        'gray-light': 'var(--gray-light)',
        'gray-dark': 'var(--gray-dark)',
        'gray-mid': 'var(--gray-mid)',
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
        '6': '64px',
      },
      borderRadius: {
        '0': '4px',
        '1': '6px',
        '2': '8px',
        '3': '12px',
        '4': '24px',
      },
      boxShadow: {
        'gray': '0px 0px 6px 0px var(--shadow-color)',
      },
      screens: {
        'sm': '480px',
        'm': '720px',
        'l': '1024px',
        'xl': '1280px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}