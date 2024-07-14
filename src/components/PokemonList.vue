<template>
  <ul 
  v-if="items.length > 0"
  class="pokemon-list"
  :class="setViewClass">
    <pokemon-list-item
      v-for="(pokemonData, index) in items"
      :pokemonData="pokemonData"
      :key="index"
    />
  </ul>
  <div v-else class="loading flex item-center m-auto">
    <p class="text-m">Loading...</p>
  </div>
</template>
<script lang="ts">
import { computed, inject } from "vue";
import { PokemonListItem } from "../util/index";
import { AppData } from '../interfaces/appData';
import { PokemonData } from '../interfaces/pokemons';

export default {
  name: "PokemonsList",
  inject: ["appData"],
  components: {
    PokemonListItem,
  },
  props: {
    items: {
      type: Array as () => PokemonData[],
      required: true,
    },
  },
  setup() {
    const appData = inject<AppData>("appData");

    if (!appData) {
      throw new Error("appData is not provided");
    }
    
    const { currentView } = appData;
    
    const setViewClass = computed(() => {
      return [
        'flex-1 xl:w-[calc(100%-372px)] mb-auto flex flex-col px-3 gap-3',
        { 'm:grid m:grid-cols-2 l:grid-cols-3' : currentView.value === "grid" },
      ];
    });
    return { currentView, setViewClass };
  },
};
</script>
