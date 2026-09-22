<script setup lang="ts">
import { computed } from 'vue'

import SiteHeader from '~/components/ui/SiteHeader.vue'
import { useEditorialMotion } from '~/composables/useEditorialMotion'
import { navigation } from '~/content/site'

const route = useRoute()
const skipTarget = computed(() => route.path === '/resume' ? '#resume-content' : '#main-content')

useEditorialMotion()
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" :href="skipTarget">Skip to content</a>
    <SiteHeader :items="navigation" />
    <NuxtPage />
  </div>
</template>

<style scoped>
.app-shell {
  margin-inline: auto;
  max-width: var(--content-max);
  min-height: 100svh;
}

.skip-link {
  background: var(--ink-strong);
  color: var(--paper);
  left: 1rem;
  min-height: 2.75rem;
  padding: .75rem 1rem;
  position: fixed;
  top: 1rem;
  translate: 0 -200%;
  z-index: 100;
}

.skip-link:focus { translate: 0; }

@media print {
  .skip-link,
  :deep(.site-header) { display: none !important; }
}
</style>
