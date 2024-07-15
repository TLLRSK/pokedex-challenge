import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import {Pokedex, Favs} from './util/index';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {name: 'Pokedex', path: '/', component: Pokedex},
        {name: 'Favs', path: '/favs', component: Favs},
        {path: '/pokedex/page-:page', component: Pokedex},
    ]
});

createApp(App)
    .use(router)
    .mount('#app')
