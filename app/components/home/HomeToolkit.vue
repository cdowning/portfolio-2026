<script setup lang="ts">
import CSectionMarker from '~/components/ui/CSectionMarker/CSectionMarker.vue'
import CTag from '~/components/ui/CTag/CTag.vue'
defineProps<{
  items: string[]
}>()
</script>

<template>
  <section class="toolkit" aria-labelledby="toolkit-title" data-reveal>
    <CSectionMarker class="toolkit-marker" number="05" />
    <header class="toolkit-header">
      <h2 id="toolkit-title" class="toolkit-title">Toolkit</h2>
      <p class="toolkit-copy">The tools that help ideas take shape.</p>
    </header>
    <ul class="toolkit-list">
      <CTag v-for="item in items" :key="item" :label="item" variant="ruled" />
    </ul>
  </section>
</template>

<style scoped>
.toolkit {
  align-items: center;
  border-bottom: 1px solid var(--rule);
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 3rem 13.5rem minmax(0, 1fr);
  padding: 2.5rem var(--page-gutter);
}

.toolkit-marker { align-self: stretch; }

.toolkit-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  letter-spacing: -.04em;
  line-height: 1;
  margin-bottom: .7rem;
}

.toolkit-copy {
  font-size: var(--text-xs);
  letter-spacing: .25em;
  line-height: 1.65;
  margin: 0;
  text-transform: uppercase;
}

.toolkit-list {
  --tag-font-size: var(--text-xs);
  --tag-min-height: 3rem;
  --tag-padding: .25rem .4rem;
  --tag-text-align: left;

  display: grid;
  gap: 0 clamp(.15rem, .45vw, .55rem);
  grid-template-columns: repeat(12, max-content);
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
}

.toolkit {
  align-items: start;
  column-gap: .5rem;
  grid-template-columns: 1.5rem minmax(0, 1fr);
  padding: 3rem 1.25rem;
}

.toolkit-marker { grid-row: 1 / 3; }

.toolkit-list {
  --tag-padding: .7rem .65rem;

  gap: 0;
  grid-column: 2;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 40rem) {
  .toolkit { column-gap: 1rem; grid-template-columns: 2.5rem minmax(0, 1fr); }
}

@media (min-width: 48rem) {
  .toolkit {
    align-items: center;
    gap: 1.5rem;
    grid-template-columns: 3rem 12rem 1fr;
    padding: 2.5rem var(--page-gutter);
  }

  .toolkit-marker { grid-row: auto; }
  .toolkit-list {
    grid-column: 3;
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 96rem) {
  .toolkit {
    grid-template-columns: 3rem 13.5rem minmax(0, 1fr);
  }

  .toolkit-list {
    --tag-padding: .25rem .4rem;

    gap: 0 clamp(.15rem, .45vw, .55rem);
    grid-template-columns: repeat(12, max-content);
  }
}
</style>
