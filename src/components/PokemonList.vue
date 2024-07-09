<template>
    <ul>
        <li v-for="(pokemon, index) in pokedexData" :key="index">
            <img :src="pokemon.sprites.front_default" alt="">
            <span>{{pokemon.id}}</span>
            <span>{{pokemon.name}}</span>
            <div>
                <span v-for="type in pokemon.types" :key="type">
                {{type.type.name}}
                </span>
            </div>
        </li>
    </ul>
</template>
<script>
    export default {
        props: {
            pokedexData: {
                type: Array,
            }
        }
        
    }
</script>