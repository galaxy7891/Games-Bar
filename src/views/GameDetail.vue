<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <div class="flex flex-col lg:flex-row items-start gap-6">
      <div class="shrink-0">
        <BackButton />
      </div>

      <div class="flex-1">
        <div v-if="loading" class="space-y-4">
          <div class="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div class="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div class="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div class="h-64 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div v-else-if="error" class="text-center py-20 text-red-600">⚠️ {{ error }}</div>

        <GameDetailCard v-else-if="game" :game="game" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { gameService } from '@/services/gameService'
import type { RawgGame } from '@/types/rawg'
import GameDetailCard from '@/components/DetailCard.vue'
import BackButton from '@/components/BackButton.vue'

const route = useRoute()
const game = ref<RawgGame | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const data = await gameService.fetchGameDetail(route.params.id as string)
    game.value = data
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})
</script>
