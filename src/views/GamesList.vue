<template>
  <h1
    class="m-6 text-center text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300"
  >
    Game Catalog
  </h1>

  <div class="w-full px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-6">
      <div class="w-full">
        <ul
          v-if="loading"
          class="grid gap-6"
          style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))"
        >
          <li v-for="n in 8" :key="n">
            <div class="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow p-4 space-y-4">
              <div class="h-40 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
              <div class="flex gap-2 mt-4">
                <div class="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div class="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </li>
        </ul>

        <ul
          v-else
          class="grid gap-6"
          style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))"
        >
          <li v-for="g in games" :key="g.id">
            <GameCard :game="g" />
          </li>
        </ul>
      </div>

      <div class="flex justify-center mb-4">
        <div class="flex items-center gap-6">
          <button
            @click="prevPage"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-sm disabled:opacity-50"
            :disabled="page <= 1 || loading"
          >
            Prev
          </button>

          <span class="text-sm dark:text-gray-300"> Page {{ page }} of {{ totalPages }} </span>

          <button
            @click="nextPage"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-sm disabled:opacity-50"
            :disabled="loading || !hasNext"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'
import GameCard from '@/components/GameCard.vue'

export default defineComponent({
  name: 'GamesList',
  components: { GameCard },
  setup() {
    const store = useGameStore()
    const { loading, error, games, page, pageSize, total } = storeToRefs(store)

    const totalPages = computed(() => {
      if (!total.value || !pageSize.value) return 1
      return Math.ceil(total.value / pageSize.value)
    })

    const hasNext = computed(() =>
      page.value && pageSize.value && total.value
        ? page.value * pageSize.value < total.value
        : false,
    )

    async function refresh() {
      await store.loadGames()
    }

    async function prevPage() {
      if (page.value <= 1) return
      await store.loadGames({ page: page.value - 1 })
    }

    async function nextPage() {
      if (!hasNext.value) return
      await store.loadGames({ page: page.value + 1 })
    }

    onMounted(async () => {
      await store.loadGames()
    })

    return {
      loading,
      error,
      games,
      page,
      total,
      totalPages,
      refresh,
      prevPage,
      nextPage,
      hasNext,
    }
  },
})
</script>
