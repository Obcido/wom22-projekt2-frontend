import { createApp } from 'vue'
import App from './App.vue'
import VueCookies from 'vue3-cookies'

createApp(App).use(VueCookies, {
    expireTimes: '1d',
    path: '/',
    domain: '',
    secure: true,
    sameSite: 'Strict'
}).mount('#app')
