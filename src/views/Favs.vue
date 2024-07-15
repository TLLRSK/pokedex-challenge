<template>
  <main class="flex flex-col min-h-[calc(100dvh)] bg-gray-light">

    <view-toggler />

    <h2 class="text-m font-semibold text-secondary absolute top-[56px] m:top-[68px] left-3">Favourites</h2>

    <section class="flex-1 flex items-end xl:justify-center xl:px-6 xl:gap-3 pb-3">

      <pokemon-list v-if="favourites.length > 0" :items="favourites" />

      <div v-else class="flex my-auto items-center justify-center flex-1 xl:w-[calc(100%-372px)] px-3 gap-3">You don't have favourite pokemons :(</div>

      <pokemon-card />

    </section>

  </main>
</template>

<script lang="ts">
import { inject } from 'vue';
import {
  Pagination,
  PokemonCard,
  PokemonList,
  ViewToggler,
} from "../util/index";

export default {
    name: 'Favs',
    components: {
        PokemonList,
        PokemonCard,
        Pagination,
        ViewToggler,
    },
    setup() {
      
        const {favourites} = inject<any>('appData');

        return {favourites};
    }
}
</script>
