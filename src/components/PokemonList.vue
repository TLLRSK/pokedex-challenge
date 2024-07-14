<template>
  <ul 
  v-if="items.length > 0"
  :class="setViewClass"
  class="w-full xl:w-[calc(100%-372px)]">
    <pokemon-list-item
      v-for="(pokemonData, index) in items"
      :pokemonData="pokemonData"
      :key="index"
    />
  </ul>
  <div v-else class="flex item-center m-auto">
    <p>Loading...</p>
  </div>
</template>
<script>
import { computed, inject } from "vue";
import { PokemonListItem } from "../util/index.js";
export default {
  name: "PokemonsList",
  inject: ["appData"],
  components: {
    PokemonListItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    }
  },
  setup() {
    const { currentView } = inject("appData");
    const setViewClass = computed(() => {
      return [
        'flex flex-col px-3 gap-3',
        { 'm:grid m:grid-cols-2 l:grid-cols-3' : currentView.value === "grid" },
      ];
    });
    return { currentView, setViewClass };
  },
};
</script>
