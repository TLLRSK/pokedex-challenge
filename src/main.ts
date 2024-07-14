import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import {Home, Favs} from './util/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {name: 'Home', path: '/', component: Home},
        {name: 'Favs', path: '/favs', component: Favs},
        {path: '/pokedex/page-:page', component: Home},
        {path: '/favs/page-:page', component: Favs},
    ]
});

createApp(App)
    .use(router)
    .mount('#app')
