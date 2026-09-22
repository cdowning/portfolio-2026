<script setup lang="ts">
import type { NavigationItem } from '~/types/content'

defineProps<{
  items: NavigationItem[]
}>()
</script>

<template>
  <header class="resume-header">
    <a class="resume-brand" href="/" aria-label="Caitlin Hawley, home">
      <strong>Caitlin Hawley</strong>
      <span>Frontend developer</span>
    </a>
    <nav aria-label="Primary">
      <a
        v-for="item in items"
        :key="item.label"
        :class="{ active: item.label === 'Resume' }"
        :href="item.href"
      >{{ item.label }}</a>
    </nav>
    <div class="resume-signature" aria-hidden="true"><i>Caitlin</i><span>—</span></div>
  </header>
</template>

<style scoped>
.resume-header {
  align-items: stretch;
  background: color-mix(in srgb, var(--paper) 95%, transparent);
  border-bottom: 1px solid var(--rule);
  display: grid;
  grid-template-columns: minmax(17rem, 1fr) auto 12rem;
  min-height: var(--header-height);
  position: sticky;
  top: 0;
  z-index: 20;
}

.resume-brand {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-inline: var(--page-gutter);
  text-decoration: none;
}

.resume-brand strong {
  color: var(--ink-strong);
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: .3em;
  line-height: 1;
  text-transform: uppercase;
}

.resume-brand span {
  font-size: .55rem;
  letter-spacing: .45em;
  margin-top: .5rem;
  text-transform: uppercase;
}

.resume-header nav {
  display: flex;
}

.resume-header nav a {
  align-items: center;
  display: flex;
  min-width: 5.2rem;
  padding-inline: 1rem;
  position: relative;
  text-decoration: none;
}

.resume-header nav a::after {
  background: var(--gold);
  bottom: .75rem;
  content: '';
  height: 2px;
  left: 1rem;
  position: absolute;
  right: 1rem;
  scale: 0 1;
  transform-origin: left;
  transition: scale var(--duration-fast) var(--ease-out);
}

.resume-header nav a:is(:hover, :focus-visible)::after,
.resume-header nav a.active::after {
  scale: 1 1;
}

.resume-signature {
  align-items: center;
  border-left: 1px solid var(--rule);
  display: flex;
  justify-content: center;
}

.resume-signature i {
  font-family: var(--font-note);
  font-size: 1.65rem;
  font-style: normal;
  rotate: -4deg;
}

.resume-signature span {
  font-size: .75rem;
  margin-left: .6rem;
}

@media (max-width: 54rem) {
  .resume-header { grid-template-columns: 1fr auto; }
  .resume-signature { display: none; }
  .resume-header nav a { min-width: auto; padding-inline: .75rem; }
}

@media (max-width: 40rem) {
  .resume-header { position: relative; }
  .resume-brand { padding: 1rem 1.25rem; }
  .resume-header nav { display: none; }
}
</style>
