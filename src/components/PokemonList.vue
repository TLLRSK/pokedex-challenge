<template>

  <ul class="pokemon-list" :class="viewClass">

    <pokemon-list-item
      v-for="(pokemonData, index) in items"
      :pokemonData="pokemonData"
      :key="index"
    />

  </ul>

</template>

<script lang="ts">

import { computed, inject, PropType } from "vue";
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
      type: Array as PropType<PokemonData[]>,
      required: true,
    },
  },
  setup() {
    const appData = inject<AppData>("appData");

    if (!appData) {
      throw new Error("appData is not provided");
    }
    
    const { currentView } = appData;
    
    const viewClass = computed(() => [
      "flex-1 xl:w-[calc(100%-372px)] px-3 mb-auto gap-3",
      {
        'list-view--list' : currentView.value === 'list',
        'list-view--grid' : currentView.value === "grid"
      }
    ]);
    
    return { currentView, viewClass };
  },
};
</script>
