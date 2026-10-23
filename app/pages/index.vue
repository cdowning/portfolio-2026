<script setup lang="ts">
import HomeAbout from '~/components/home/HomeAbout.vue'
import HomeExperience from '~/components/home/HomeExperience.vue'
import HomeHero from '~/components/home/HomeHero/HomeHero.vue'
import HomeToolkit from '~/components/home/HomeToolkit.vue'
import HomeWork from '~/components/home/HomeWork.vue'
import SiteContactFooter from '~/components/site/SiteContactFooter/SiteContactFooter.vue'
import { experience, profile, toolkit, workItems } from '~/content/site'
import { createPageSeo } from '~/utils/seo'

const { canonical, meta } = createPageSeo({
  siteUrl: useRuntimeConfig().public.siteUrl,
  path: '/',
  title: 'Caitlin Hawley — Frontend Developer & Design System Builder',
  description: profile.shortSummary,
  ogTitle: 'Caitlin Hawley — Frontend Developer',
  ogDescription: profile.shortSummary,
  ogType: 'website',
})

useSeoMeta(meta)
useHead({
  link: [{ rel: 'canonical', href: canonical }],
})
</script>

<template>
  <div class="home-page">
    <main id="main-content">
      <HomeHero :profile="profile" />
      <HomeWork :items="workItems" />
      <HomeAbout :profile="profile" />
      <HomeExperience :experience-label="profile.experienceLabel" :roles="experience" />
      <HomeToolkit :items="toolkit" />
    </main>
    <SiteContactFooter :profile="profile" section-number="06" />
  </div>
</template>

<style scoped>
.home-page {
  margin-inline: auto;
  max-width: var(--content-max);
  min-height: 100svh;
}

</style>
