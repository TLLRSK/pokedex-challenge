<template>
    <article class="w-full fixed xl:flex-1 xl:h-[588px] flex xl:sticky bottom-[0] xl:border-[2px] border-main border-3 rounded-4">
        <pokeball class="hidden text-main opacity-50 absolute xl:block"/>

        <div v-if="isSelectedPokemon" class="w-full p-3 bg-main rounded-4 z-10">
            <div class="flex justify-between">
                <button>
                    <fav/>
                </button>
                <button @click="this.unselectPokemon">
                    <close/>
                </button>
            </div>

            <div class="flex items-center justify-center">
                <pokeball :class="['absolute w-[240px] h-[240px] opacity-50', `text-${mainType}`]"/>
                <img 
                class="w-[280px] h-[280px] m-auto z-10"
                :src="selectedPokemon.sprites.other['official-artwork'].front_default" :alt="selectedPokemon.name">
            </div>

            <div class="flex flex-col gap-3">

                <div class="flex items-center justify-between">
                    <h4 :class="['w-fit px-2 text-main text-l capitalize rounded-4', `bg-${this.mainType}`]">
                        {{selectedPokemon.name}}
                    </h4>
                    <span>Nº {{selectedPokemon.id}}</span>
                </div>

                <div class="flex gap-3">

                    <div class="flex flex-col gap-1">
                        <h4 class="uppercase font-semibold text-gray-200">Types</h4>

                        <div class="flex flex-col gap-2">
                            <div 
                            v-for="(type, index) in selectedPokemon.types" 
                            :key="index"
                            class="flex items-center gap-1">
                                <div :class="['w-3 h-3 rounded-full',`bg-${type.type.name}`]"/>
                                <span class="text-sm uppercase">
                                    {{type.type.name}}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex flex-col flex-1 gap-1">
                        <h4 class="uppercase font-semibold text-gray-200">Stats</h4>
                        <div class="flex flex-col gap-2">
                            <div 
                            v-for="(stat, index) in selectedPokemon.stats" 
                            :key="index"
                            class="flex w-full">
                                <span class="w-[20%] text-sm">{{ statsMap[stat.stat.name] }}</span>
                                <div class="flex-1 bg-gray-100 rounded-4 overflow-hidden relative">
                                    <span class="absolute right-1 text-sm">{{stat.base_stat}}</span>
                                    <div :style="{ width: getStatPercent(stat.base_stat) }" :class="[`h-full bg-${mainType}`]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>
<script>
import {Fav, Close, Pokeball} from "../util/index.js";

    export default {
        components: {
            Fav,
            Close,
            Pokeball,
        },
        props: {
            selectedPokemon: {
                type: Object,
                required: true,
            },
            isSelectedPokemon: {
                type: Boolean,
                required: true,
            }
        },
        data() {
            return {
                statsMap: {
                    'hp': 'HP',
                    'attack': 'ATTK',
                    'defense': 'DEF',
                    'special-attack': 'S-ATTK',
                    'special-defense': 'S-DEF',
                    'speed': 'SPD',
                }
            }
        },
        computed: {
            mainType() {
                return this.selectedPokemon.types[0].type.name;
            }
        },
        methods: {
            getStatPercent(statValue) {
                const maxValue = 255
                const statPercent = (Number(statValue) * 100)/maxValue
                return statPercent + '%';
            },
            unselectPokemon() {
                this.$emit('unselect-pokemon');
            }
        }
    }
</script>
