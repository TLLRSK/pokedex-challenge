<template>
    <li>
        <img :src="pokemonData.sprites.front_default" alt="">
        <span>{{pokemonData.id}}</span>
        <span>{{pokemonData.name}}</span>
        <div>
            <span v-for="type in pokemonData.types" :key="type">
            {{type.type.name}}
            </span>
        </div>
        <button>Select pokemon</button>
    </li> 
</template>
<script>
    export default {
        props: {
            pokemonData: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                pokemon: this.pokemonData,
            }
        },
        mounted() {
            console.log(this.pokemonData)
        }
    }
</script>