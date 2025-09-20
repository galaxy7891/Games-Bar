<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppNavbar title="Games Bar" />

    <router-view />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
</script>
