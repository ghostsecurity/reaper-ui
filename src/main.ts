import './assets/themes.css'
import './assets/index.css'

import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useNavStore } from './stores/nav'
const BASE_URL = import.meta.env.VITE_BASE_URL
const WS_URL = import.meta.env.VITE_WS_URL

// axios defaults
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true
axios.defaults.headers['accept'] = 'application/json'

const app = createApp(App)

router.afterEach((to, from) => {
  const navStore = useNavStore()
  navStore.recordNavigation(to.path, from.path)
})

app.use(router)
app.use(createPinia())
app.provide('BASE_URL', BASE_URL)
app.provide('WS_URL', WS_URL)
app.provide('axios', axios)
app.mount('#app')
