import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import {Home, Favs} from './util/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/favs', component: Favs},
    ]
});

createApp(App)
    .use(router)
    .mount('#app')
