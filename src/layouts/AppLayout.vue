<template>
  <TheHeader />

  <main class="container mx-auto py-4">
    <RouterView />
  </main>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
</script>

<style scoped></style>