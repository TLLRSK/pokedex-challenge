<template>
  <header class="flex p-1 gap-3 bg-gray-dark text-main m:p-3 fixed left-[0] right-[0] z-30">
    <router-link class="mr-auto" to="/">
      <h1 class="uppercase font-semibold">Pokedex</h1>
    </router-link>

    <light-toggler />

    <Nav />
  </header>
</template>
<script>
import { Nav, LightToggler } from "../util/index.js";
export default {
  components: { LightToggler, Nav },
};
</script>