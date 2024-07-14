<template>
  <main class="flex flex-col min-h-[calc(100dvh)] bg-gray-light">
    <view-toggler />

    <section class="flex items-end xl:justify-center xl:px-6 xl:gap-3">
      <pokemon-list :items="currentPokemonsInPage" />
      <pokemon-card />
    </section>

    <pagination :items="pokedexData" />
  </main>
</template>

<script>
import { inject, computed } from "vue";
import { Pagination, PokemonCard, PokemonList, ViewToggler } from "../util/index.js";

export default {
  name: "Home",
  components: { PokemonList, PokemonCard, Pagination, ViewToggler },
  setup() {
    const { pokedexData, currentPokemons, currentPage, pokemonsPerPage } = inject("appData");

    const currentPokemonsInPage = currentPokemons(pokedexData);

    return { pokedexData, currentPokemonsInPage, currentPage, pokemonsPerPage };
  }
};
</script>
