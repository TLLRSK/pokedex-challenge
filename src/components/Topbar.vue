<template>
  <header class="flex p-1 gap-2 bg-gray-300 text-main m:p-2">
    <h1 class="mr-auto uppercase font-semibold">Pokedex</h1>

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