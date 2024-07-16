<template>
  <header class="px-6 py-2 flex items-center justify-between border-b">
    <img alt="Vue logo" class="logo" height="30" src="@/assets/logo.svg" width="30" />

    <nav class="space-x-2 flex">
      <RouterLink class="flex items-center gap-x-2 p-2 text-sm text-slate-700 rounded-lg hover:bg-gray-200 transition" to="/">Home</RouterLink>
      <RouterLink class="flex items-center gap-x-2 p-2 text-sm text-slate-700 rounded-lg hover:bg-gray-200 transition" to="/about">About</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">

import { RouterLink } from 'vue-router'
</script>

<style scoped>

</style>