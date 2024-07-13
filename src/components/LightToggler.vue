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

<script>
import { inject } from "vue";
import { Light, Dark } from "../util/index.js";

export default {
  name: "LightToggler",
  components: {
    Light,
    Dark,
  },
  setup() {
    const { darkMode, toggleDarkMode } = inject("appData");

    return { darkMode, toggleDarkMode };
  },
};
</script>
