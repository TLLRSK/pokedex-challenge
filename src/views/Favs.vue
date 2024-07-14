<template>
  <main class="flex flex-col min-h-[calc(100dvh)] bg-gray-light">
    <view-toggler />

    <section class="flex items-end xl:justify-center xl:px-6 xl:gap-3">
      <pokemon-list :items="favourites" />
      <pokemon-card />
    </section>

    <pagination :items="favourites"/>
  </main>
</template>
<script>
import { inject } from 'vue';
import {
  Pagination,
  PokemonCard,
  PokemonList,
  ViewToggler,
} from "../util/index.js";
export default {
    name: 'Favs',
    components: {
        PokemonList,
        PokemonCard,
        Pagination,
        ViewToggler,
    },
    setup() {
        const {favourites, currentPokemons} = inject('appData');
        
        const currentPokemonsInPage = currentPokemons(favourites)

        return {favourites, currentPokemonsInPage};
    }
}
</script>
