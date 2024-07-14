<template>
<li 
:class="setItemClass"
class="pokemonListItem gap-3 rounded-2 bg-main shadow-gray relative hover:shadow-secondary"
>
    <img 
    v-if="pokemonData.sprites.front_default"
    :class="setImgClass" 
    :src="pokemonData.sprites.front_default" 
    :alt="pokemonData.name"
    >

    <div :class="setInfoClass">
        <div :class="setMainInfoClass">
            <span class="text-sm">Nº {{pokemonData.id}}</span>
            <span class="text-sm uppercase font-bold">{{pokemonData.name}}</span>
        </div>

        <div :class="setTypesClass">
            <div 
            v-for="(type, index) in pokemonData.types"
            :class="[showTypes(type), setTypeClass]"
            :key="index"
            >
                <span :class="setTypeSpanClass">
                {{type.type.name}}
                </span>
            </div>
        </div>
    </div>
    <button class="absolute inset-[0]" @click="selectPokemon(pokemonData)"></button>
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

        const setItemClass = computed(() => ({
            'flex items-center p-1': currentView.value === 'list',
            'flex p-2': currentView.value === 'grid',
        }));

        const setImgClass = computed(() => ({
            'w-[40px] h-[40px]': currentView.value === 'list',
            'w-[80px] h-[80px]': currentView.value === 'grid',
        }));

        const setInfoClass = computed(() => ({
            'flex flex-1 gap-3': currentView.value === 'list',
            'flex flex-col gap-3': currentView.value === 'grid',
        }));

        const setMainInfoClass = computed(() => ({
            'flex gap-3': currentView.value === 'list',
            'flex flex-col gap-0': currentView.value === 'grid',
        }));

        const setTypesClass = computed(() => ({
            'flex gap-2 ml-auto': currentView.value === 'list',
            'flex gap-2': currentView.value === 'grid',
        }));

        const setTypeClass = computed(() => ({
            'w-3 h-3 m:w-auto m:h-auto px-0 text-main rounded-full m:rounded-1 uppercase text-sm': currentView.value === 'list',
            'w-auto h-auto px-0 text-main rounded-full m:rounded-1 uppercase text-sm': currentView.value === 'grid',
        }));

        const setTypeSpanClass = computed(() => ({
            'hidden m:block text-sm font-regular': currentView.value === 'list',
            'text-sm font-regular': currentView.value === 'grid',
        }));

        function showTypes(type: Type) {
            const typeName = type.type.name;
            return `bg-${typeName}`;
        }

        return {
            setItemClass,
            setImgClass,
            setInfoClass,
            setMainInfoClass,
            setTypesClass,
            setTypeClass,
            setTypeSpanClass,
            showTypes,
            selectPokemon,
            currentView,
        };
    },
};
</script>