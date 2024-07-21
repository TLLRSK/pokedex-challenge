<template>
<li :class="itemClass">
    <img 
    v-if="pokemonData.sprites.front_default"
    class="item__img"
    :src="pokemonData.sprites.front_default" 
    :alt="pokemonData.name"
    >

    <div class="item__info">
        <div class="item__main-info">
            <span class="text-sm">Nº {{pokemonData.id}}</span>
            <span class="text-sm uppercase font-bold">{{pokemonData.name}}</span>
        </div>

        <div class="item__types">
            <div 
            v-for="(type, index) in pokemonData.types"
            class="type"
            :class="[bgTypeColor(type)]"
            :key="index"
            >
                <span>
                    {{type.type.name}}
                </span>
            </div>
        </div>
    </div>
    <button class="btn-select-pokemon absolute inset-[0]" @click="selectPokemon(pokemonData)"></button>
</li> 
</template>

<script lang="ts">
import { computed, inject, PropType } from 'vue';
import { AppData } from '../interfaces/appData';
import { PokemonData, Type } from '../interfaces/pokemons';

export default {
    props: {
        pokemonData: {
        type: Object as PropType<PokemonData>,
        required: true,
        },
    },

    setup() {
        const appData = inject<AppData>("appData");

        if (!appData) {
        throw new Error("appData is not provided");
        }

        const { selectPokemon, currentView } = appData;

        const itemClass = computed(() => [
            "pokemon-list-item gap-3 rounded-2 bg-main shadow-gray relative hover:shadow-secondary",
            {
                'flex items-center p-1 item-img:item-img--list item-info:item-info--list item-main-info:main-info--list item-types:types--list item-type:type--list item-type-span:type-span--list': currentView.value === 'list',
                'flex p-2 item-img:item-img--grid item-info:item-info--grid item-main-info:main-info--grid item-types:types--grid item-type:type--grid item-type-span:type-span--grid': currentView.value === 'grid',
            }
        ]);

        function bgTypeColor(type: Type) {
            const typeName = type.type.name;
            return `bg-${typeName}`;
        }

        return {
            itemClass,
            bgTypeColor,
            selectPokemon,
            currentView,
        };
    },
};
</script>