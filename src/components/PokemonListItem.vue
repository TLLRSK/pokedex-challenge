<template>
    <li 
        :class="setItemClass"
        class="pokemonListItem gap-3 rounded-2 bg-main shadow-gray-100 relative"
    >
        <img 
            :class="setImgClass" 
            :src="pokemonData.sprites.front_default" 
            :alt="pokemonData.name">

        <div :class="setInfoClass">
            <div :class="setMainInfoClass">
                <span class="text-sm">Nº {{pokemonData.id}}</span>
                <span class="text-sm uppercase">{{pokemonData.name}}</span>
            </div>

            <div :class="setTypesClass">
                <div 
                    v-for="(type, index) in pokemonData.types"
                    :class="[showTypes(type), setTypeClass]"
                    :key="index">
                    <span :class="setTypeSpanClass">
                        {{type.type.name}}
                    </span>
                </div>
            </div>
        </div>
        <button class="absolute inset-[0]" @click="selectPokemon(pokemonData)"></button>
    </li> 
</template>
<script>
    export default {
        props: {
            pokemonData: {
                type: Object,
                required: true,
            },
            currentView: {
                type: String,
                required: true,
            }
        },
        inject: ['selectPokemon'],
        computed: {
            setItemClass() {
                return [
                    {'flex items-center p-1': this.currentView === 'list'},
                    {'flex p-2': this.currentView === 'grid'},
                ]
            },
            setImgClass() {
                return [
                    {'w-[40px] h-[40px]': this.currentView === 'list'},
                    {'w-[80px] h-[80px]': this.currentView === 'grid'},
                ]
            },
            setInfoClass() {
                return [
                    {'flex flex-1 gap-3': this.currentView === 'list'},
                    {'flex flex-col gap-3': this.currentView === 'grid'},
                ]
            },
            setMainInfoClass() {
                return [
                    {'flex gap-3': this.currentView === 'list'},
                    {'flex flex-col gap-0': this.currentView === 'grid'},
                ]
            },
            setTypesClass() {
                return [
                    {'flex gap-2 ml-auto': this.currentView === 'list'},
                    {'flex gap-2': this.currentView === 'grid'},
                ]
            },
            setTypeClass() {
                return [
                    {'w-3 h-3 m:w-auto m:h-auto px-0 text-main rounded-full m:rounded-1 uppercase text-sm': this.currentView === 'list'},
                    {'w-auto h-auto px-0 text-main rounded-full m:rounded-1 uppercase text-sm': this.currentView === 'grid'},
                ]
            },
            setTypeSpanClass() {
                return [
                    {'hidden m:block text-sm font-regular': this.currentView === 'list'},
                    {'text-sm font-regular': this.currentView === 'grid'},
                ]
            }
        },
        methods: {
            showTypes(type) {
                const typeName = type.type.name;
                return `bg-${typeName}`;
            }
        },
    }
</script>