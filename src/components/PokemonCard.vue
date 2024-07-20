<template>

  <article class="pokemon-slot w-full flex justify-center fixed xl:w-[312px] xl:h-[590px] xl:sticky bottom-[0] xl:bottom-4 xl:border-[2px] border-main border-3 xl:rounded-4 z-40">
    
    <pokeball class="pokeball hidden w-[240px] h-[240px] text-main absolute top-[60px] xl:block rotate-[24deg] animate-spin-slow"/>

    <div
      v-if="isSelectedPokemon && selectedPokemon"
      class="pokemon-card w-full p-3 flex flex-col m:flex-row xl:flex-col bg-main xl:rounded-4"
    >

      <div class="card-buttons flex justify-between absolute left-3 right-3 z-20">

        <button class="btn-fav" @click="updateFavourites(selectedPokemon)">
          <fav :class="getFavClasses" />
        </button>

        <button class="btn-close-card rounded-full hover:bg-gray-mid" @click="unselectPokemon">
          <close />
        </button>

      </div>

      <div class="card-image flex items-center justify-center m:mt-4 m:ml-[8%] xl:m-[0]">
        
        <pokeball :class="['pokeball absolute w-[240px] h-[240px] opacity-50 rotate-[24deg] animate-spin-slow', `text-${mainType}`]"/>

        <img
          v-if="selectedPokemon && selectedPokemon.sprites.other['official-artwork'].front_default"
          class="portrait w-[280px] h-[280px] m-auto z-10"
          :src="selectedPokemon.sprites.other['official-artwork'].front_default"
          :alt="selectedPokemon.name"
        />
      </div>

      <div class="card-info flex flex-1 flex-col gap-3 m:mt-4 m:mr-[8%]">

        <div class="card-main-info flex items-center justify-between">

          <h4 class="name w-fit text-l font-semibold capitalize rounded-4">
            {{ selectedPokemon.name }}
          </h4>

          <span class="id">Nº {{ selectedPokemon.id }}</span>

        </div>

        <div class="card-types flex gap-2">

          <div
            v-for="(type, index) in selectedPokemon.types"
            :key="index"
            class="type flex items-center gap-1"
          >
            <div :class="['type-sign w-3 h-3 rounded-full', `bg-${type.type.name}`]" />

            <span class="type-name text-sm uppercase">
              {{ type.type.name }}
            </span>

          </div>

        </div>

        <div class="card-stats flex flex-col gap-2">
          <div
            v-for="(stat, index) in selectedPokemon.stats"
            :key="index"
            class="stat flex w-full"
          >
            <span class="stat-name w-[20%] text-sm text-gray-dark font-bold">
              {{ statsMap[stat.stat.name] || stat.stat.name }}
            </span>

            <div class="stat-bar flex-1 bg-gray-light rounded-4 overflow-hidden relative">

              <span class="points absolute right-1 text-sm text-secondary">{{ stat.base_stat }}</span>

              <div
                :style="{ width: getStatPercent(stat.base_stat) }"
                :class="[`filled h-full bg-${mainType}`]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  </article>

   <div 
      v-if="isSelectedPokemon"
      ref="overlay"
      class="overlay xl:hidden fixed bg-secondary top-[0] right-[0] bottom-[0] z-30 left-[0] opacity-20"/>
</template>

<script lang="ts">
import { computed, inject, ref, watch } from "vue";
import { Fav, Close, Pokeball } from "../util/index";
import { AppData } from '../interfaces/appData';

export default {
  name: "PokemonCard",
  components: {
    Fav,
    Close,
    Pokeball,
  },
  setup() {
    const appData = inject<AppData>("appData");

    const overlay = ref(null);

    if (!appData) {
      throw new Error("appData is not provided");
    }
    
    const {
      isSelectedPokemon,
      selectedPokemon,
      unselectPokemon,
      isFaved,
      updateFavourites,
    } = appData;

    const mainType = computed(() => {
      if (selectedPokemon) {
        return selectedPokemon.value.types[0].type.name;
      }
    });

    const getFavClasses = computed(() => {
      return ["hover:text-fire", { "text-fire fill-fire hover:": isFaved.value }];
    });
    
    const statsMap: Record<string, string> = {
      hp: "HP",
      attack: "ATTK",
      defense: "DEF",
      "special-attack": "S-ATTK",
      "special-defense": "S-DEF",
      speed: "SPD",
    };

    const getStatPercent = (statValue: number) => {
      const maxValue = 255;
      const statPercent = (Number(statValue) * 100) / maxValue;
      return statPercent + "%";
    };

    watch(
      () => isSelectedPokemon.value,
      (newValue) => {

        if (newValue) {
          setTimeout(() => {
            document.addEventListener("click", outsideClickHandler);
          }, 100);
        } else {
          document.removeEventListener('click', outsideClickHandler);
        }
      }
    );
    
    const outsideClickHandler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (overlay.value && overlay.value.contains(target)) {
        unselectPokemon();
      }
    };

    return {
      overlay,
      isSelectedPokemon,
      selectedPokemon,
      updateFavourites,
      unselectPokemon,
      mainType,
      isFaved,
      getFavClasses,
      statsMap,
      getStatPercent,
    };
  },
};
</script>
