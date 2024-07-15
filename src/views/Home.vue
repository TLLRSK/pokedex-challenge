<template>
  <main class="flex-1 flex flex-col bg-gray-light">
    <view-toggler />

    <section class="flex-1 flex items-end xl:justify-center xl:px-6 xl:gap-3">
      <pokemon-list v-if="pokedexData.length > 0" :items="currentPokemonsInPage" />
      <div v-else class="flex my-auto items-center justify-center flex-1 xl:w-[calc(100%-372px)] px-3 gap-3">Loading pokedex data...</div>
      <pokemon-card />
    </section>

    <pagination :items="pokedexData" />
  </main>
</template>

<script lang="ts">
import { ComputedRef, inject, defineComponent } from "vue";
import { Pagination, PokemonCard, PokemonList, ViewToggler } from "../util/index";
import { AppData } from '../interfaces/appData';
import { PokemonData } from '../interfaces/pokemons';

export default defineComponent({
  name: "Home",
  components: { PokemonList, PokemonCard, Pagination, ViewToggler },
  setup() {
    const injectedData = inject<AppData>("appData");

    if (!injectedData) {
      throw new Error("appData is not provided");
    }

    const { pokedexData, currentPokemons, currentPage, pokemonsPerPage } = injectedData;

    const currentPokemonsInPage: ComputedRef<PokemonData[]> = currentPokemons(pokedexData);

    return { pokedexData, currentPokemonsInPage, currentPage, pokemonsPerPage };
  }
});
</script>
