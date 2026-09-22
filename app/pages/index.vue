<script setup lang="ts">
import HomeAbout from '~/components/home/HomeAbout.vue'
import HomeContact from '~/components/home/HomeContact.vue'
import HomeExperience from '~/components/home/HomeExperience.vue'
import HomeHero from '~/components/home/HomeHero.vue'
import HomeToolkit from '~/components/home/HomeToolkit.vue'
import HomeWork from '~/components/home/HomeWork.vue'
import { experience, profile, toolkit, workItems } from '~/content/site'

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
  <div class="home-page">
    <main id="main-content">
      <HomeHero :profile="profile" />
      <HomeWork :items="workItems" />
      <HomeAbout :profile="profile" />
      <HomeExperience :roles="experience" />
      <HomeToolkit :items="toolkit" />
    </main>
    <HomeContact :profile="profile" />
  </div>
</template>

<style scoped>
.home-page {
  margin-inline: auto;
  max-width: var(--content-max);
  min-height: 100svh;
}

</style>
