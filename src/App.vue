<template>
  <top-bar />
  <router-view></router-view>
</template>

<script lang="ts">

import { computed, ComputedRef, markRaw, onMounted, provide, Ref, ref, watch } from "vue";
import {
  TopBar,
  Grid,
  List,
} from "./util/index";
import { useRouter, useRoute } from 'vue-router'
import {PokemonData, PokemonEntry} from "../src/interfaces/pokemons";
import {AppData} from "../src/interfaces/appData";

export default {
  name: "App",
  components: {
    TopBar,
  },
  setup() {
    // Light Toggling
    let darkMode = ref(false);

    const toggleDarkMode = () => {
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
    const views = [
      {
        name: "grid",
        icon: markRaw(Grid),
      },
      {
        name: "list",
        icon: markRaw(List),
      },
    ];

    const currentView = ref("grid");

    const setView = (selectedView: string) => {
      currentView.value = selectedView;
    };

    // Pokemon data
    const pokedexData = ref<PokemonData[]>([]);

    const fetchData = async () => {
      const baseUrl = "https://pokeapi.co/api/v2/pokedex/6/";

      try {
        const data = await fetch(baseUrl);
        const response = await data.json();

        const allPokemonData: PokemonData[] = await Promise.all(
          response.pokemon_entries.map(async (pokemonEntry: PokemonEntry) => {
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
    
    const currentPokemons = (list: Ref<PokemonData[]>): ComputedRef<PokemonData[]> => {
      return computed(() => {
        const start = (currentPage.value - 1) * pokemonsPerPage;
        const end = start + pokemonsPerPage;
        return list.value.slice(start, end);
      });
    };

    // Pagination
    const currentPage = ref(1);
    const pokemonsPerPage = 30;

    // Pokemon Card
    const isSelectedPokemon = ref(false);
    const selectedPokemon: Ref<PokemonData | undefined> = ref(undefined);
    const isFaved = ref(false);

    const selectPokemon = (pokemonData: PokemonData) => {
      selectedPokemon.value = pokemonData;
      isSelectedPokemon.value = true;
      toggleFavourite(pokemonData);
    };

    const unselectPokemon = () => {
      isSelectedPokemon.value = false;
    };

    // Favourites
    const favourites = ref<PokemonData[]>([]);

    const loadFavourites = () => {
      const favPokemons = localStorage.getItem("favPokemons");

      if (favPokemons) {
        favourites.value = JSON.parse(favPokemons);
      }
    };

    const saveFavourites = () => {
      localStorage.setItem("favPokemons", JSON.stringify(favourites.value));
    };

    const toggleFavourite = (pokemonData: PokemonData) => {
      isFaved.value = favourites.value.some(
        (pokemon) => pokemon.id === pokemonData.id
      );
    };

    const updateFavourites = (pokemonData: PokemonData) => {
      const index = favourites.value.findIndex(
        (pokemon) => pokemon.id === pokemonData.id
      );

      index !== -1
        ? favourites.value.splice(index, 1)
        : favourites.value.push(pokemonData);

      toggleFavourite(pokemonData);
      saveFavourites();
    };
 
    // Routing
    const router = useRouter();
    const route = useRoute();

    watch(
      () => route.path,
      () => {
        const currentPath = route.path;
        if (router.options.routes.some( route => route.path === currentPath)) {
          currentPage.value = 1;
          isSelectedPokemon.value = false;
          selectedPokemon.value = undefined;
        }
      }
    );

    onMounted(() => {
      fetchData();
      loadFavourites();
      userColorSchemePreference();
    });

    provide<AppData>("appData", {
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
      selectedPokemon: selectedPokemon as Ref<PokemonData>,
      toggleFavourite,
      favourites,
      isFaved,
      updateFavourites,
    });
  },
};
</script>
