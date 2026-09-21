<script setup lang="ts">
import { experience, profile } from '~/content/site'

useSeoMeta({
  title: 'Caitlin Hawley — Résumé',
  description: `${profile.role} experience, skills, tools, and education.`,
  ogTitle: 'Caitlin Hawley — Résumé',
  ogDescription: profile.summary,
  ogType: 'profile',
  ogUrl: `${profile.website}/resume`,
})

useHead({
  link: [{ rel: 'canonical', href: `${profile.website}/resume` }],
})
</script>

<template>
  <main class="phase-shell">
    <h1>{{ profile.name }}</h1>
    <p>{{ profile.summary }}</p>
    <p>{{ experience.length }} verified roles</p>
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
