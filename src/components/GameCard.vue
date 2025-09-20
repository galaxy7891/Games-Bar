<template>
  <div
    class="rounded-xl border p-4 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 transition flex flex-col min-h-[320px]"
  >
    <img
      v-if="game.background_image"
      :src="game.background_image"
      :alt="game.name"
      class="w-full h-44 object-cover rounded-lg mb-3"
    />
    <div
      v-else
      class="w-full h-44 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center text-gray-500"
    >
      No Image
    </div>

    <div class="flex flex-col flex-grow">
      <h2 class="text-lg font-bold mb-1 dark:text-white text-black truncate">
        {{ game.name }}
      </h2>

      <p class="text-sm text-gray-600 dark:text-gray-300">
        ⭐ {{ game.rating ?? '—' }} | Released: {{ formatDate(game.released) }}
      </p>

      <p v-if="game.genres?.length" class="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
        🎮 {{ game.genres.map((g) => g.name).join(', ') }}
      </p>

      <p
        v-if="game.parent_platforms?.length"
        class="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate"
      >
        🖥️ {{ game.parent_platforms.map((p) => p.platform.name).join(', ') }}
      </p>
    </div>

    <div class="mt-3 flex gap-2">
      <FavoriteButton :game="game" />

      <router-link
        :to="{ name: 'GameDetail', params: { id: game.id } }"
        class="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm shadow hover:bg-blue-700 transition"
      >
        View Detail
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RawgGame } from '@/types/rawg'
import FavoriteButton from '@/components/FavoriteButton.vue'

defineProps<{ game: RawgGame }>()

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>
