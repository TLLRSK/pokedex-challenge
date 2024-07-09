# Pokedex Challenge
# Vue 3 + TypeScript + Vite + Tailwind CSS + Vitest

Why this tools? Because I want to test myself developing a project with tools I'm not much familiar with and learn in the proccess.

With this project I'll try to learn/practice/improve my knowledge of:
- Vue 3 (event and props management, handling routes, Vue's life cycle, asynchronous functions)
- Tailwind CSS basics
- Typescript basics
- Vitest unit tests

## Design
Design made with Figma. Contains two views: Home and Favs. Designed for mobile, tablet and desktop.

### HOME
Must show only the 151 Sinnoh's Pokemon.
Url with info about pokemons: https://www.wikidex.net/wiki/Lista_de_Pok%C3%A9mon_seg%C3%BAn_la_Pok%C3%A9dex_de_Sinnoh
Pokeapi documentation about pokedexes endpoint: https://pokeapi.co/docs/v2#utility-section

- Indexed pokedex: https://pokeapi.co/api/v2/pokedex/
- Indexed pokemons in Sinnoh's Pokedex: https://pokeapi.co/api/v2/pokedex/6/

#### Topbar
- App title
- Nav

##### Nav
Composed of:
- Light mode toggler
- Links to: Home, Favs.

##### View Toggler
List and Grid buttons.

#### Pokemon list
Composed of:
- Single pokemon basic data
- Selected pokemon details

##### Single Pokemon Data
Showing:
- Pokemon image
- Id number
- Name
- Types

##### Selected Pokemon Details Card
Showing:
- Pokemon image
- Id number
- Name
- Types
- Stats
- Is faved
- Close card button

This card details will:
- Use the main pokemon type colour.
- On mobile and tablet: display when user selects a pokemon.
- On desktop: display over the card slot when user selects pokemon.

#### Pagination
Composed of:
- Next and previous page buttons
- Indexed page button

1. After fetching all pokemons, get the quantity of pages by dividing all pokemons amount by the pokemons displayed at each page.
2. Wether user is at first or last page, don't display the prev or next button.
3. Show a max amount of pokemon per page.

##### 3. Show a max amount of pokemon per page.
- Set current page number.
- Set max amount of pokemons per page.
- Get first and last pokemon using current page and max amount values then split the array with all pokemons.
- Render by mapping the new array.

### FAVOURITES
Showing marked as favourite pokemons

Storing each marked pokemon in a state and rendering them when user is at Favourites page.
* Use local storage.


## Journal
- Found an error (cannot access before initialization) importing components from index.js, fixed by sorting the way files are exported.
- Found problems trying to fetch some single pokemons with this method:
    1. Get all pokemons: "https://pokeapi.co/api/v2/pokedex/6/"
    2. This will return each single pokemon data with this format, e.g:
    {
      "entry_number": 4,
      "pokemon_species": {
        "name": "chimchar",
        "url": "https://pokeapi.co/api/v2/pokemon-species/390/"
      }
    },
    3. If I use the name for fetching like "https://pokeapi.co/api/v2/pokemon/giratina" some pokemons are not found.
    4. Instead of that, I've tried to use the id in the url (390 in this case) by splitting it from the string.
    5. And it worked.