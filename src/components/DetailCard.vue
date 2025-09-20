<template>
  <div
    class="space-y-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-10 transition-colors duration-300"
  >
    <section class="space-y-2 border-b border-gray-200 dark:border-gray-700 pb-4">
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        {{ game.name }}
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">Released: {{ formattedDate }}</p>
    </section>

    <section>
      <div class="overflow-hidden rounded-xl shadow-md">
        <img
          v-if="game.background_image"
          :src="game.background_image"
          :alt="game.name"
          class="w-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div
          v-else
          class="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400"
        >
          No Image
        </div>
      </div>
    </section>

    <section
      class="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm"
    >
      <div class="space-y-2">
        <p class="flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <span class="text-yellow-500">⭐</span>
          <span class="font-semibold">Rating:</span>
          <span>{{ game.rating ?? '—' }} ({{ game.ratings_count }} votes)</span>
        </p>
        <p class="flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <span class="text-blue-500">⏱</span>
          <span class="font-semibold">Playtime:</span>
          <span>{{ game.playtime ?? 0 }} hours</span>
        </p>
      </div>

      <div class="space-y-2">
        <p class="flex items-start gap-2 text-gray-800 dark:text-gray-100">
          <span class="text-pink-500">🎮</span>
          <span class="font-semibold">Genres:</span>
          <span>
            <template v-if="game.genres?.length">
              <span
                v-for="genre in game.genres"
                :key="genre.id"
                class="inline-block bg-pink-100 dark:bg-pink-600/80 dark:text-white text-pink-700 text-xs font-medium px-2 py-0.5 rounded-full mr-1"
              >
                {{ genre.name }}
              </span>
            </template>
            <span v-else>—</span>
          </span>
        </p>

        <p class="flex items-start gap-2 text-gray-800 dark:text-gray-100">
          <span class="text-green-500">🖥</span>
          <span class="font-semibold">Platforms:</span>
          <span>
            <template v-if="game.platforms?.length">
              <span
                v-for="p in game.platforms"
                :key="p.platform.id"
                class="inline-block bg-green-100 dark:bg-green-600/80 dark:text-white text-green-700 text-xs font-medium px-2 py-0.5 rounded-full mr-1"
              >
                {{ p.platform.name }}
              </span>
            </template>
            <span v-else>—</span>
          </span>
        </p>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">About</h2>
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-justify">
        {{ game.description_raw || 'No description available.' }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RawgGame } from '@/types/rawg'

const props = defineProps<{
  game: RawgGame
}>()

const formattedDate = computed(() => {
  if (!props.game.released) return '—'
  const date = new Date(props.game.released)
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
})
</script>
