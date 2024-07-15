<template>
  <main class="flex-1 flex flex-col bg-gray-light">
    
    <view-toggler />

    <section class="flex-1 flex items-end xl:justify-center xl:px-6 xl:gap-3">

      <pokemon-list v-if="currentPokemons.length > 0" :items="currentPokemons" />

      <div v-else class="flex my-auto items-center justify-center flex-1 xl:w-[calc(100%-372px)] px-3 gap-3">Loading pokedex data...</div>

      <pokemon-card />

    </section>

    <pagination :items="pokedexData" />
  </main>
</template>

<script lang="ts">
import { inject, defineComponent, ref, watch, Ref } from "vue";
import { Pagination, PokemonCard, PokemonList, ViewToggler } from "../util/index";
import { AppData } from '../interfaces/appData';
import { PokemonData } from '../interfaces/pokemons';

export default defineComponent({
  name: "Pokedex",
  components: { PokemonList, PokemonCard, Pagination, ViewToggler },
  setup() {

    const injectedData = inject<AppData>("appData");
    const currentPokemons = ref<PokemonData[]>([]);

    if (!injectedData) {
      throw new Error("appData is not provided");
    }

    const { pokedexData, currentPage, pokemonsPerPage } = injectedData;
 
    const getCurrentPokemons = (listRef: Ref<PokemonData[]>) : PokemonData[] => {
        const list = listRef.value;
        const start = (currentPage.value - 1) * pokemonsPerPage;
        const end = start + pokemonsPerPage;
        const result = list.slice(start, end);
        return result;
    };

    watch(
      () => [pokedexData.value, currentPage.value],
      () => {
        currentPokemons.value = getCurrentPokemons(pokedexData);
      },
      { immediate: true }
    );

    return { pokedexData, currentPage, currentPokemons };
  }
});
</script>
