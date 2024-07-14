<template>
  <nav class="nav">
    <label for="menu-toggler" class="menu-toggler flex m:hidden rounded-full">
      <input
        class="absolute appearance-none"
        type="checkbox"
        name="menu-toggler"
        id="menu-toggler"
        v-model="isChecked"
      />
      <menu-icon />
    </label>

    <ul :class="getNavClasses">
      <li class="ml-auto">
        <router-link class="text-main font-semibold uppercase" to="/">Home</router-link>
      </li>
      <li class="ml-auto">
        <router-link class="text-main font-semibold uppercase" to="/favs">Favs</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed, ref } from 'vue';
import { MenuIcon } from "../util/index.js";
export default {
  components: {
    MenuIcon,
  },
  setup() {
    const isChecked = ref(false);
    const getNavClasses = computed(() => {
      return [
        {
          'flex flex-col': isChecked.value,
          'hidden m:flex': !isChecked.value
        },
        "m:flex-row absolute m:static left-[0] right-[0] bg-gray-mid m:bg-transparent mt-1 m:mt-[0px] p-2 m:p-[0] gap-3",
      ]
    })
    return {isChecked, getNavClasses};
  }
};
</script>
