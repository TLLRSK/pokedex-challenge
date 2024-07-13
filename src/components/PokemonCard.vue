<template>
  <article
    class="w-full flex justify-center fixed xl:w-[312px] xl:h-[590px] xl:sticky bottom-[0] xl:bottom-4 xl:border-[2px] border-main border-3 xl:rounded-4"
  >
    <pokeball
      class="hidden w-[240px] h-[240px] text-main absolute top-[60px] xl:block rotate-[24deg]"
    />

    <div
      v-if="isSelectedPokemon"
      class="w-full p-3 flex flex-col m:flex-row xl:flex-col bg-main xl:rounded-4 z-10"
    >
      <div class="flex justify-between absolute left-3 right-3 z-20">
        <button @click="updateFavourites(selectedPokemon)">
          <fav :class="favedClasses" />
        </button>

        <button @click="unselectPokemon">
          <close />
        </button>
      </div>

      <div class="flex items-center justify-center m:mt-4 m:ml-[8%] xl:m-[0]">
        <pokeball
          :class="[
            'absolute w-[240px] h-[240px] opacity-50 rotate-[24deg]',
            `text-${mainType}`,
          ]"
        />
        <img
          class="w-[280px] h-[280px] m-auto z-10"
          :src="selectedPokemon.sprites.other['official-artwork'].front_default"
          :alt="selectedPokemon.name"
        />
      </div>

      <div class="flex flex-1 flex-col gap-3 m:mt-4 m:mr-[8%]">
        <div class="flex items-center justify-between">
          <h4 class="w-fit text-l font-semibold capitalize rounded-4">
            {{ selectedPokemon.name }}
          </h4>
          <span>Nº {{ selectedPokemon.id }}</span>
        </div>

        <div class="flex gap-2">
          <div
            v-for="(type, index) in selectedPokemon.types"
            :key="index"
            class="flex items-center gap-1"
          >
            <div :class="['w-3 h-3 rounded-full', `bg-${type.type.name}`]" />
            <span class="text-sm uppercase">
              {{ type.type.name }}
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div
            v-for="(stat, index) in selectedPokemon.stats"
            :key="index"
            class="flex w-full"
          >
            <span class="w-[20%] text-sm text-gray-300 font-bold">{{
              statsMap[stat.stat.name]
            }}</span>
            <div class="flex-1 bg-gray-100 rounded-4 overflow-hidden relative">
              <span class="absolute right-1 text-sm">{{ stat.base_stat }}</span>
              <div
                :style="{ width: getStatPercent(stat.base_stat) }"
                :class="[`h-full bg-${mainType}`]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { computed, inject } from "vue";
import { Fav, Close, Pokeball } from "../util/index.js";

export default {
  name: "PokemonCard",
  components: {
    Fav,
    Close,
    Pokeball,
  },
  setup() {
    const {
      isSelectedPokemon,
      selectedPokemon,
      unselectPokemon,
      isFaved,
      updateFavourites,
    } = inject("appData");

    const mainType = computed(() => {
      return selectedPokemon.value.types[0].type.name;
    });

    const favedClasses = computed(() => {
      return { "text-fire fill-fire": isFaved.value };
    });

    const statsMap = {
      hp: "HP",
      attack: "ATTK",
      defense: "DEF",
      "special-attack": "S-ATTK",
      "special-defense": "S-DEF",
      speed: "SPD",
    };

    const getStatPercent = (statValue) => {
      const maxValue = 255;
      const statPercent = (Number(statValue) * 100) / maxValue;
      return statPercent + "%";
    };

    return {
      isSelectedPokemon,
      selectedPokemon,
      updateFavourites,
      unselectPokemon,
      mainType,
      isFaved,
      favedClasses,
      statsMap,
      getStatPercent,
      unselectPokemon,
    };
  },
};
</script>
