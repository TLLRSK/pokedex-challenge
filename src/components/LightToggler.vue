<template>
  <label for="light-toggler" class="cursor-pointer">
    <input
      type="checkbox"
      id="light-toggler"
      class="appearance-none absolute"
      :checked="darkMode"
      @change="toggleDarkMode"
    />

    <Light v-if="!darkMode" />
    <Dark v-else />
  </label>
</template>

<script lang="ts">
import { inject } from "vue";
import { Light, Dark } from "../util/index";
import { AppData } from '../interfaces/appData';

export default {
  name: "LightToggler",
  components: {
    Light,
    Dark,
  },
  setup() {
    const appData = inject<AppData>('appData')

    if (!appData) {
      throw new Error("appData is not provided");
    }
    
    const { darkMode, toggleDarkMode } = appData;

    return { darkMode, toggleDarkMode };
  },
};
</script>
