<template>
    <ul>
        <pokemon-list-item
            v-for="(pokemonData, index) in pokedexData"
            :pokemonData="pokemonData"
            :key="index"
        />
    </ul>
</template>
<script>
import {PokemonListItem} from "../util/index.js"
    export default {
        props: {
            pokedexData: {
                type: Array,
                required: true,
            }
        },
        components: {
            PokemonListItem,
        }
        
    }
</script>