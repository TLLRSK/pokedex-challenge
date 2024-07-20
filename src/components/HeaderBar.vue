<template>
  <header class="topbar flex p-1 gap-3 bg-gray-dark text-main m:p-3 fixed left-[0] right-[0] z-30 transition">

    <router-link class="link-home mr-auto" to="/">
      <h1 class="title uppercase font-semibold">Pokedex</h1>
    </router-link>

    <light-toggler />

    <Nav />

  </header>
</template>

<script lang="ts">
import { Nav, LightToggler } from "../util/index";

export default {
  components: { LightToggler, Nav },
};
</script>