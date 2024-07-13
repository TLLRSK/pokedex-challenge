<template>
  <ul :class="setViewClass" class="w-full xl:w-[calc(100%-372px)]">
    <pokemon-list-item
      v-for="(pokemonData, index) in currentPokemons"
      :pokemonData="pokemonData"
      :key="index"
    />
  </ul>
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
  setup() {
    const { currentPokemons, currentView } = inject("appData");
    const setViewClass = computed(() => {
      return [
        { "flex flex-col px-3 gap-3": currentView.value === "list" },
        {
          "flex flex-col m:grid m:grid-cols-2 l:grid-cols-3 px-3 gap-3":
            currentView.value === "grid",
        },
      ];
    });
    return { currentPokemons, currentView, setViewClass };
  },
};
</script>
