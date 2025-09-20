<template>
  <nav
    class="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md px-4 sm:px-6 lg:px-8 py-3 rounded-b-xl transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <h1
        class="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 tracking-wider drop-shadow-lg"
      >
        {{ title }}
      </h1>

      <div class="hidden md:flex items-center gap-4">
        <div class="flex items-center w-full sm:w-auto max-w-md">
          <input
            v-model="query"
            type="text"
            placeholder="Search games..."
            class="flex-1 px-4 py-2 rounded-l-full border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400"
            @keyup.enter="doSearch"
          />
          <button
            @click="doSearch"
            class="px-4 py-2 rounded-r-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200"
          >
            🔍
          </button>
        </div>

        <router-link
          to="/favorites"
          class="px-4 py-2 rounded-lg bg-emerald-600 text-white shadow hover:bg-emerald-700 transition"
        >
          ⭐ Favorites
        </router-link>

        <DarkToggle />
      </div>

      <button
        @click="toggleMenu"
        class="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        ☰
      </button>
    </div>

    <div
      v-if="menuOpen"
      class="md:hidden mt-4 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4"
    >
      <div class="flex items-center w-full">
        <input
          v-model="query"
          type="text"
          placeholder="Search games..."
          class="flex-1 px-4 py-2 rounded-l-full border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400"
          @keyup.enter="doSearch"
        />
        <button
          @click="doSearch"
          class="px-4 py-2 rounded-r-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200"
        >
          🔍
        </button>
      </div>

      <router-link
        to="/favorites"
        class="block px-4 py-2 rounded-lg bg-emerald-600 text-white shadow hover:bg-emerald-700 transition text-center"
      >
        ⭐ Favorites
      </router-link>

      <div class="flex justify-center">
        <DarkToggle />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import DarkToggle from '@/components/ThemeMode.vue'
import { useGameStore } from '@/stores/game'

const props = defineProps<{ title?: string }>()
const title = props.title ?? 'Games Bar'

const query = ref('')
const store = useGameStore()

let debounceTimer: number | undefined

async function doSearch() {
  await store.loadGames({ page: 1, search: query.value })
}

watch(query, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = window.setTimeout(() => {
    store.loadGames({ page: 1, search: newVal })
  }, 500)
})

const menuOpen = ref(false)
function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>
