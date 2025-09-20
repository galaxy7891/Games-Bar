<template>
  <button
    @click="themeStore.toggleTheme"
    class="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:shadow-md hover:scale-105 active:scale-95"
  >
    <span v-if="themeStore.theme === 'dark'">🌙 Dark Mode</span>
    <span v-else>☀️ Light Mode</span>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
themeStore.initTheme()
</script>
