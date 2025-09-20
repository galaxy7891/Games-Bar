import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'

// --- setup ---
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// ✅ load favorites setelah pinia di-inject
import { useFavoriteStore } from '@/stores/favorite'
const favoriteStore = useFavoriteStore(pinia)
favoriteStore.loadFromStorage()

// --- mount ---
app.mount('#app')
