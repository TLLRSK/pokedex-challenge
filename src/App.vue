<template>
  <top-bar/>
  <main>
    <view-toggler />
    <pokemon-list :pokedexData="this.pokedexData" :currentView="this.currentView"/>
    <pokemon-card/>
  </main>
  <pagination/>
</template>
<script>
import { markRaw } from 'vue';
import {
  TopBar, 
  Pagination, 
  PokemonCard, 
  PokemonList, 
  ViewToggler,
  List,
  Grid,
} from './util/index.js';

export default {
  components: {
    TopBar,
    PokemonList,
    PokemonCard,
    Pagination,
    ViewToggler,
    List,
    Grid,
  },
  provide() {
    return {
      currentView: this.currentView,
      views: this.views,
      selectView: this.setView,
    }
  },
  data() {
    return {
      pokedexData: [],
      currentView: 'list',
      views: [
        {
          name: 'grid',
          icon: markRaw(Grid),
        },
        {
          name: 'list',
          icon: markRaw(List),
        },
      ],
    }
  },
  methods: {
    async fetchData() {
      const baseUrl = "https://pokeapi.co/api/v2/pokedex/6/"
      try {
        const data = await fetch(baseUrl);
        const response = await data.json();

        const allPokemonData = await Promise.all(response.pokemon_entries.map(async(pokemonEntry) => {
          const pokemonUrl = await pokemonEntry.pokemon_species.url;
          const splittedId = pokemonUrl.split('/').filter(blank => blank).pop()
          const url = `https://pokeapi.co/api/v2/pokemon/${splittedId}`
          try {
            const data = await fetch(url);
            const response = await data.json();
            return response;
          } catch(error) {
            throw error;
          }
        }))
        
        this.pokedexData = allPokemonData;
      } catch (error) {
        throw error;
      }
    },
    setView(selectedView) {
      this.currentView = selectedView;
    }
  },
  mounted() {
    this.fetchData();
  }

}
</script>