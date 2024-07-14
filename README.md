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
Must show only the 210 Sinnoh's Pokemon.
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

1. Set 'grid' as current view by default
2. Style selected input
3. Send input value from ViewToggler to App
4. Change App currentView value
5. Change PokemonList style
6. Change PokemonListItem style

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

1. After fetching all pokemons, get the amount of pages by dividing all pokemons amount by the pokemonsPerPage value at each page. Then round with Math.ceil.
2. Wether user is at first or last page, don't display the prev or next button.
3. Show a max amount of pokemon per page.

##### 3. Show a max amount of pokemon per page.
- Set current page number.
- Set max amount of pokemons per page.
- Get first and last pokemon using current page and max amount values then slice the array with all pokemons.
- Render by mapping the new array.

### FAVOURITES
Showing marked as favourite pokemons


* Use local storage.

1. Check if there are fav pokemons in localStorage.
2. If there are fav pokemons, parse JSON and save them into data()
3. Pass fav pokemons to Fav view as prop.
4. On showing selected pokemon at PokemonCard, check if pokemon is in fav pokemons list using it's ID.
5. Change fav button style depending on listed/non listed condition.
6. When clicking on pokemon card, add or remove pokemon from fav pokemons list using it's ID.
  - Use findIndex() for checking if that pokemon exists in the list and it's index in the array.
  - If it's in the array use the index for splice it.
  - If it's not in the array push into it.
  Link: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

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
    5. It worked.

Creating safeColors:
- Found a problem trying to apply dynamic classes to pokemon's type elements. Tailwind CSS uses static classes so you just can't use them dynamically.
Found a solution in the following article:
https://medium.com/@achronus/solving-a-niche-frontend-problem-dynamic-tailwind-css-classes-in-react-da5f513ecf6a

- Found some problems implementing the ViewToggler component at passing a custom component from App this way:
views: [
        {
          name: 'grid',
          icon: Grid,
        },
        {
          name: 'list',
          icon: List,
        },
      ],

Then it appeared a warning message on console suggesting to mark the comopnent with markRaw or use shalowRef. I solved by changing views to this:

views: [
        {
          name: 'grid',
          icon: markRaw(Grid),
        },
        {
          name: 'list',
          icon: markRaw(List),
        },
      ],

Link: https://reintech.io/blog/working-with-dynamic-components-in-vuejs

Inject/Provide
- Found problems trying to pass data between App and PokemonList for classes toggling purpose. Tried provide/inject and data is passed correctly at first time, but when I change currentView from ViewToggler, the new view's value doesn't change accordingly. Seems that provide/inject isn't reactive, so I just passed the prop directly and it worked.

Link:
https://www.reddit.com/r/vuejs/comments/13rl6ms/best_way_to_pass_data_when_dealing_with_deeply/

Setting groups of dynamic classes
- Found problems implementing classes in PokemonListItem depending on PokemonList view classes. Found a solution at configuring variants, but I'll try first a more simple solution using Vue props and computed.

Link: https://v2.tailwindcss.com/docs/configuring-variants.

- Found an issue trying to re-render current pokemons list using props stored in data(). Values stored in data() ARE NOT REACTIVE. Solved passing them directly as prop.

From Options API to Composition API 😭
- After trying different ideas to avoid prop drilling, I decided to migrate the whole app to Composition API:
Links:
https://vuejs.org/guide/components/provide-inject
https://www.codemag.com/Article/2101091/The-Complete-Guide-to-Provide-Inject-API-in-Vue-3-Part-1


Light mode with Tailwind CSS using css variables and user color scheme preference:
Links:
https://invertase.io/blog/tailwind-dark-mode
https://www.sitepoint.com/theming-tailwind-css-variables-clean-architecture/

Vue Router
https://router.vuejs.org/

Check: Differences between 'ref' and 'reactive'. pokedexData and pokedexData.value

favPokemons exceeded the quota
Found that localStorage has a limit number of 29 items. For now keeping pagination on Favs looks useless but I'll keep it anyway.

Closing Menu on clicking outside
- Found problems trying to make the menu toggler closing when clicking outside. After thinking looking for some examples, I tried to:
1. Change input checkbox to button.
2. Set links list as ref.
3. On clicking menu-toggler button, toggle isChecked.
3. If menu is open create an eventListener.
4. If is not open, remove eventListener.
5. If there's a click outside the link list, close the menu.

Links: https://stackoverflow.com/questions/71093658/how-to-get-refs-using-composition-api-in-vue3

Having a hard time typing with typescript
- Lot of issues dealing with reactive values, computed functions, etc.

Testing with Vitest
- Similar to hard typing, working with a new framework requires a knowledge that I don't have yet. I tried to test some basic cases with Pagination after several tries.

## Conclusions
I wanted to test myself being far from my comfort zone and that's what I did. My objective was to develop this project with tools I haven't worked with for more than 2 weeks, learn and take decisions through the proccess. All the functionalities I wanted to put in are there althought I'd like to have a cleaner code, add smooth behaviour at components, have time for refactorizing and go deeper into Tailwind and Typescript.