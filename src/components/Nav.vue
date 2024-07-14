<template>
  <nav>
    <label for="menu-toggler" class="m:hidden">
      <input
        class="absolute appearance-none"
        type="checkbox"
        name="menu-toggler"
        id="menu-toggler"
      />

      <menu-icon />
    </label>

    <ul class="hidden m:flex m:gap-3">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/favs">Favs</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { MenuIcon } from "../util/index.js";
export default {
  components: {
    MenuIcon,
  },
};
</script>
