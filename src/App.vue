<template>
  <top-bar />

  <main class="flex flex-col min-h-[calc(100dvh)] bg-gray-100">
    <view-toggler />

    <section class="flex items-end xl:justify-center xl:px-6 xl:gap-3">
      <pokemon-list />
      <pokemon-card />
    </section>

    <pagination />
  </main>
</template>

<script>
import { computed, markRaw, onMounted, provide, ref } from "vue";
import {
  TopBar,
  Pagination,
  PokemonCard,
  PokemonList,
  ViewToggler,
  List,
  Grid,
} from "./util/index.js";

export default {
  name: "App",
  components: {
    TopBar,
    PokemonList,
    PokemonCard,
    Pagination,
    ViewToggler,
    List,
    Grid,
  },
  setup() {
    // Light Toggling
    let lightMode = ref(true);

    const toggleLightMode = () => {
      lightMode.value = !lightMode.value;

      if (!lightMode.value) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

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

    const currentPokemons = computed(() => {
      const start = (currentPage.value - 1) * pokemonsPerPage;
      const end = start + pokemonsPerPage;
      const currents = pokedexData.value.slice(start, end);

      return currents;
    });

    // Pagination
    const currentPage = ref(1);
    const pokemonsPerPage = 30;

    const changePage = (page) => {
      currentPage.value = page;
    };

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
    });

    provide("appData", {
      pokedexData,
      currentPokemons,
      lightMode,
      toggleLightMode,
      views,
      currentView,
      setView,
      currentPage,
      changePage,
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
