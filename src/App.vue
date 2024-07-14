<template>
  <top-bar />
  <router-view></router-view>
</template>

<script>
import { computed, markRaw, onMounted, provide, ref } from "vue";
import {
  TopBar,
  Grid,
  List,
} from "./util/index.js";

export default {
  name: "App",
  components: {
    TopBar,
  },
  setup() {
    // Light Toggling
    let darkMode = ref(false);

    const toggleDarkMode = () => {
      console.log("darkmode: ", darkMode.value)
      darkMode.value = !darkMode.value;

      if (darkMode.value) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    const userColorSchemePreference = () => {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      darkMode.value = prefersDarkScheme;
    }

    // Views
    const views = ref([
      {
        name: "grid",
        icon: markRaw(Grid),
      },
      {
        name: "list",
        icon: markRaw(List),
      },
    ]);

    const currentView = ref("grid");

    const setView = (selectedView) => {
      currentView.value = selectedView;
    };

    // Pokemon data
    const pokedexData = ref([]);

    const fetchData = async () => {
      const baseUrl = "https://pokeapi.co/api/v2/pokedex/6/";

      try {
        const data = await fetch(baseUrl);
        const response = await data.json();

        const allPokemonData = await Promise.all(
          response.pokemon_entries.map(async (pokemonEntry) => {
            const pokemonUrl = await pokemonEntry.pokemon_species.url;
            const splittedId = pokemonUrl
              .split("/")
              .filter((blank) => blank)
              .pop();
            const url = `https://pokeapi.co/api/v2/pokemon/${splittedId}`;

            try {
              const data = await fetch(url);
              const response = await data.json();
              return response;
            } catch (error) {
              throw error;
            }
          })
        );

        pokedexData.value = allPokemonData;
      } catch (error) {
        throw error;
      }
    };

    const currentPokemons = (list) => {
      return computed(() => {
        const start = (currentPage.value - 1) * pokemonsPerPage;
        const end = start + pokemonsPerPage;
        const result = list.value.slice(start, end);
        return result;
      });
    };

    // Pagination
    const currentPage = ref(1);
    const pokemonsPerPage = 30;

    // Pokemon Card
    const isSelectedPokemon = ref(false);
    const selectedPokemon = ref({});
    const isFaved = ref(false);

    const selectPokemon = (pokemonData) => {
      selectedPokemon.value = pokemonData;
      isSelectedPokemon.value = true;

      toggleFavourite(pokemonData);
    };

    const unselectPokemon = () => {
      isSelectedPokemon.value = false;
    };

    // Favourites
    const favourites = ref([]);

    const loadFavourites = () => {
      const favPokemons = localStorage.getItem("favPokemons");

      if (favPokemons) {
        favourites.value = JSON.parse(favPokemons);
      }
    };

    const saveFavourites = () => {
      localStorage.setItem("favPokemons", JSON.stringify(favourites.value));
    };

    const toggleFavourite = (pokemonData) => {
      isFaved.value = favourites.value.some(
        (pokemon) => pokemon.id === pokemonData.id
      );
    };

    const updateFavourites = (pokemonData) => {
      const index = favourites.value.findIndex(
        (pokemon) => pokemon.id === pokemonData.id
      );

      index !== -1
        ? favourites.value.splice(index, 1)
        : favourites.value.push(pokemonData);

      toggleFavourite(pokemonData);
      saveFavourites();
    };

    onMounted(() => {
      fetchData();
      loadFavourites();
      userColorSchemePreference();
    });

    provide("appData", {
      pokedexData,
      currentPokemons,
      darkMode,
      toggleDarkMode,
      views,
      currentView,
      setView,
      currentPage,
      pokemonsPerPage,
      selectPokemon,
      isSelectedPokemon,
      unselectPokemon,
      selectedPokemon,
      toggleFavourite,
      favourites,
      isFaved,
      updateFavourites,
    });
  },
};
</script>
