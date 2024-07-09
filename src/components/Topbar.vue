<template>    
    <header>
        <h1>Pokedex</h1>
        <light-toggler/>
        <Nav/>
    </header>
</template>
<script>
import {Nav, LightToggler} from '../util/index.js';
export default {
    components: { LightToggler, Nav },
}
</script>