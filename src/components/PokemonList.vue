<template>
    <ul class="flex flex-col p-3 gap-3">
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