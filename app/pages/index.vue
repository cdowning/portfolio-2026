<script setup lang="ts">
import { profile } from '~/content/site'

useSeoMeta({
  title: 'Caitlin Hawley — Frontend Developer & Design System Builder',
  description: profile.shortSummary,
  ogTitle: 'Caitlin Hawley — Frontend Developer',
  ogDescription: profile.shortSummary,
  ogType: 'website',
  ogUrl: profile.website,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: profile.website }],
})
</script>

<template>
  <main class="phase-shell">
    <h1>{{ profile.name }}</h1>
    <p>{{ profile.shortSummary }}</p>
  </main>
</template>

<style scoped>
.phase-shell {
  margin-inline: auto;
  max-width: var(--content-max);
  min-height: 100vh;
  padding: var(--page-gutter);
}
</style>
