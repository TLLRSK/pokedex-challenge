<template>
    <li class="flex items-center gap-3 rounded-2 bg-main shadow-gray-100">
        <img class="w-[80px] h-[80px]" :src="data.sprites.front_default" :alt="data.name">
        <div class="flex gap-3">
            <span class="text-sm">Nº {{data.id}}</span>
            <span class="text-sm uppercase">{{data.name}}</span>
        </div>
        <div class="flex gap-2 pr-3 ml-auto">
            <div 
                v-for="(type, index) in data.types"
                :class="showTypes(type)"
                class="w-3 h-3 m:w-auto m:h-auto px-0 text-main rounded-full m:rounded-1 uppercase text-m"
                :key="index">
                <span class="hidden m:block font-regular">
                    {{type.type.name}}
                </span>
            </div>
        </div>
        <!-- <button>Select pokemon</button> -->
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
        methods: {
            showTypes(type) {
                const typeName = type.type.name;
                return `bg-${typeName}`;
            }
        },
    }
</script>