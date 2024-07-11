<template>
    <ul :class="setViewClass" class="w-full xl:w-[calc(100%-372px)]">
        <pokemon-list-item
            v-for="(pokemonData, index) in currentPokemons"
            :pokemonData="pokemonData"
            :key="index"
            :currentView="this.currentView"
        />
    </ul>
</template>
<script>
import {PokemonListItem} from "../util/index.js"
    export default {
        props: {
            currentPokemons: {
                type: Array,
                required: true,
            },
            currentView: {
                type: String,
                required: true,
            }
        },
        components: {
            PokemonListItem,
        },
        computed: {
            setViewClass() {
                return [
                    {'flex flex-col px-3 gap-3': this.currentView === 'list'},
                    {'flex flex-col m:grid m:grid-cols-2 l:grid-cols-3 px-3 gap-3': this.currentView === 'grid'}
                ]
            }
        }
    }
</script>