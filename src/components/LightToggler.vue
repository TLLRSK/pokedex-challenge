<template>
  <label for="light-toggler" class="cursor-pointer">
    <input
      type="checkbox"
      id="light-toggler"
      class="appearance-none absolute"
      :checked="lightMode"
      @change="toggleLightMode"
    />

    <Light v-if="lightMode" />
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
    const { lightMode, toggleLightMode } = inject("appData");

    return { lightMode, toggleLightMode };
  },
};
</script>
