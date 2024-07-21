/** @type {import('tailwindcss').Config} */

const typeColors = ['normal','rock','ground','dark', 'ghost', 'poison','psychic','fairy','fire','fighting','electric','grass','bug','steel','ice','flying','water',
'dragon']

const safeColors = typeColors.flatMap((color) => [`bg-${color}`, `text-${color}`]);

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  safelist: [
    ...safeColors
  ],
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
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function({ addVariant, addUtilities}) {
      addVariant('item-img', '& [class="item__img"]');
      addVariant('item-info', '& [class="item__info"]');
      addVariant('item-main-info', '& [class="item__main-info"]');
      addVariant('item-types', '& [class^="item__types"]');
      addVariant('item-type', '& [class^="type"]');
      addVariant('item-type-span', '& [class^="type"]>span');

      const newUtilities = {
        /* PokemonList Utilities */
        '.list-view--list': {
          display: 'flex',
          flexDirection: 'column',
        },
        '.list-view--grid': {
          display: 'grid',
          gridTemplateColumns: '1fr',
          '@screen m': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@screen l': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          }
        },

        /* PokemonListItem Utilities */
        '.item-img--list': {
          width: '40px',
          height: '40px',
        },
        '.item-img--grid': {
          width: '80px',
          height: '80px',
        },
        '.item-info--list': {
          display: 'flex',
          flex: '1',
          gap: 'theme("spacing.3")',
        },
        '.item-info--grid': {
          display: 'flex',
          flexDirection: 'column',
          gap: 'theme("spacing.3")',
        },
        '.main-info--list': {
          display: 'flex',
          gap: 'theme("spacing.3")',
        },
        '.main-info--grid': {
          display: 'flex',
          flexDirection: 'column',
          gap: 'theme("spacing.0")',
        },
        '.types--list': {
          display: 'flex',
          marginLeft: 'auto',
          gap: 'theme("spacing.2")',
        },
        '.types--grid': {
          display: 'flex',
          gap: 'theme("spacing.2")',
        },
        '.type--list': {
          width: 'theme("spacing.3")',
          height: 'theme("spacing.3")',
          padding: '0 theme("spacing.0")',
          color: 'theme("colors.main")',
          borderRadius: '50%',
          textTransform: 'uppercase',
          fontSize: 'theme("fontSize.sm")',
          '@screen m': {
            width: 'auto',
            height: 'auto',
            borderRadius: 'theme("borderRadius.1")',
          }
        },
        '.type--grid': {
          width: 'auto',
          height: 'auto',
          padding: '0 theme("spacing.0")',
          color: 'theme("colors.main")',
          borderRadius: 'theme("borderRadius.1")',
          textTransform: 'uppercase',
          fontSize: 'theme("fontSize.sm")',
          '@screen m': {
            borderRadius: 'theme("borderRadius.1")'
          }
        },
        '.type-span--list': {
          display: 'none',
          fontSize: 'theme("fontSize.sm")',
          fontWeight: '400',
          '@screen m': {
            display: 'block',
          }
        },
        '.type-span--grid': {
          fontSize: 'theme("fontSize.sm")',
          fontWeight: '400',
        }
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    
  ],
}