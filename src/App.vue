<template>
  <top-bar/>
  <main class="flex flex-col min-h-[calc(100dvh)] bg-gray-100">
    <view-toggler />
    <section class="flex items-end">
      <pokemon-list 
        :currentPokemons="currentPokemons" 
        :currentView="this.currentView"/>
      <pokemon-card 
        :isSelectedPokemon="this.isSelectedPokemon"
        :selectedPokemon="this.selectedPokemon"
        @unselect-pokemon="unselectPokemon"/>
    </section>
    <pagination :pages="totalPages" :currentPage="currentPage" @page-changed="changePage"/>
  </main>
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
      selectPokemon: this.selectPokemon,
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
      pages: 5,
      currentPage: 1,
      pokemonsPerPage: 30,
      isSelectedPokemon: false,
      selectedPokemon: {
        "id": '999',
        "name": 'giraita',
        "sprites": {
          "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/487.png",
          "other": {
            "official-artwork": {
              "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/487.png",
              "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/487.png"
            },
          },
        },
        "stats": [
          {
            "base_stat": 150,
            "effort": 3,
            "stat": {
              "name": "hp",
              "url": "https://pokeapi.co/api/v2/stat/1/"
            }
          },
          {
            "base_stat": 100,
            "effort": 0,
            "stat": {
              "name": "attack",
              "url": "https://pokeapi.co/api/v2/stat/2/"
            }
          },
          {
            "base_stat": 120,
            "effort": 0,
            "stat": {
              "name": "defense",
              "url": "https://pokeapi.co/api/v2/stat/3/"
            }
          },
          {
            "base_stat": 100,
            "effort": 0,
            "stat": {
              "name": "special-attack",
              "url": "https://pokeapi.co/api/v2/stat/4/"
            }
          },
          {
            "base_stat": 120,
            "effort": 0,
            "stat": {
              "name": "special-defense",
              "url": "https://pokeapi.co/api/v2/stat/5/"
            }
          },
          {
            "base_stat": 90,
            "effort": 0,
            "stat": {
              "name": "speed",
              "url": "https://pokeapi.co/api/v2/stat/6/"
            }
          }
        ],
        "types": [
          {
            "slot": 1,
            "type": {
              "name": "ghost",
              "url": "https://pokeapi.co/api/v2/type/8/"
            }
          },
          {
            "slot": 2,
            "type": {
              "name": "dragon",
              "url": "https://pokeapi.co/api/v2/type/16/"
            }
          }
        ],
      },
    }
  },
  computed: {
    totalPages() {
      const totalPages = Math.ceil(this.pokedexData.length / this.pokemonsPerPage);
      return totalPages;
    },
    currentPokemons() {
      const start = (this.currentPage - 1) * this.pokemonsPerPage;
      const end = start + this.pokemonsPerPage;
      const currentPokemons = this.pokedexData.slice(start, end);
      return currentPokemons;
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
    },
    selectPokemon(pokemonData) {
      this.selectedPokemon = pokemonData;
      this.isSelectedPokemon = true;
    },
    unselectPokemon() {
      this.isSelectedPokemon = false;
    },
    changePage(page) {
      this.currentPage = page;
    }
  },
  mounted() {
    this.fetchData();
  },
}
</script>