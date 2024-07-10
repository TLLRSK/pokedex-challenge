<template>
    <li>
        <img :src="data.sprites.front_default" :alt="data.name">
        <span>{{data.id}}</span>
        <span>{{data.name}}</span>
        <div>
            <span v-for="type in data.types" :key="type">
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
                data: this.pokemonData,
            }
        },
    }
</script>