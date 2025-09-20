<template>
  <button
    @click="toggle"
    class="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition
           hover:bg-emerald-600 hover:text-white
           dark:border-gray-600 dark:hover:bg-emerald-700"
    :class="isFav ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300'"
  >
    <Heart
      :class="isFav ? 'fill-current text-white' : ''"
      class="w-4 h-4"
    />
    <span>{{ isFav ? 'Favorited' : 'Add to Favorites' }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFavoriteStore } from '@/stores/favorite'
import type { RawgGame } from '@/types/rawg'
import { Heart } from 'lucide-vue-next'

const props = defineProps<{
  game: RawgGame
}>()

const store = useFavoriteStore()

const isFav = computed(() => store.isFavorite(props.game.id))

function toggle() {
  store.toggleFavorite(props.game)
}
</script>
