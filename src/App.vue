<template>
  <top-bar/>
  <main>
    <view-toggler/>
    <pokemon-list/>
    <pokemon-card/>
  </main>
  <pagination/>
</template>
<script>
import {
  TopBar, 
  Pagination, 
  PokemonCard, 
  PokemonList, 
  ViewToggler
} from './util/index.js';

export default {
  components: {
    TopBar,
    PokemonList,
    PokemonCard,
    Pagination,
    ViewToggler,
  },

}
</script>