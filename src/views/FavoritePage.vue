<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-3 items-center mb-6">
      <div class="flex justify-start">
        <BackButton />
      </div>
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white text-center">My Favorites</h1>
      <div></div>
    </div>

    <div
      v-if="!isLoading && favorites.length === 0"
      class="text-center py-20 text-gray-500 dark:text-gray-400"
    >
      ⭐ You haven't added any favorites yet.
    </div>

    <ul
      v-if="isLoading"
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <li v-for="n in pageSize" :key="n">
        <div class="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-lg h-64 w-full"></div>
        <div class="animate-pulse mt-2 h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="animate-pulse mt-1 h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </li>
    </ul>

    <ul v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li v-for="game in paginatedFavorites" :key="game.id">
        <GameCard :game="game" />
      </li>
    </ul>

    <div v-if="!isLoading && totalPages > 1" class="flex justify-center items-center mt-8 gap-4">
      <button
        @click="prevPage"
        :disabled="page <= 1"
        class="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-sm disabled:opacity-50"
      >
        Prev
      </button>

      <span class="text-sm dark:text-gray-300 items-center">
        Page {{ page }} of {{ totalPages }}
      </span>

      <button
        @click="nextPage"
        :disabled="page >= totalPages"
        class="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoriteStore } from '@/stores/favorite'
import GameCard from '@/components/GameCard.vue'
import BackButton from '@/components/BackButton.vue'

const store = useFavoriteStore()
const { favorites } = storeToRefs(store)

const page = ref(1)
const pageSize = 8
const isLoading = ref(true)

const totalPages = computed(() => Math.ceil(favorites.value.length / pageSize))

const paginatedFavorites = computed(() => {
  const start = (page.value - 1) * pageSize
  return favorites.value.slice(start, start + pageSize)
})

function prevPage() {
  if (page.value > 1) page.value--
}

function nextPage() {
  if (page.value < totalPages.value) page.value++
}

onMounted(() => {
  store.loadFromStorage()
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})
</script>
