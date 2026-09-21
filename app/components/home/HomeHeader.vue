<script setup lang="ts">
import type { NavigationItem } from '~/types/content'

defineProps<{
  items: NavigationItem[]
}>()
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Caitlin Hawley, home">
      <strong class="brand__name">Caitlin Hawley</strong>
      <span class="brand__role">Frontend developer</span>
    </a>

    <nav class="nav" aria-label="Primary">
      <a
        v-for="item in items"
        :key="item.label"
        class="nav__link"
        :class="{ 'nav__link--active': item.label === 'Work' }"
        :href="item.href"
      >
        {{ item.label }}
      </a>
    </nav>

    <div class="signature" aria-hidden="true">
      <span class="signature__name">Caitlin</span><span class="signature__dash">—</span>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  align-items: stretch;
  background: color-mix(in srgb, var(--paper) 94%, transparent);
  border-bottom: 1px solid var(--rule);
  display: grid;
  grid-template-columns: minmax(17rem, 1fr) auto 12rem;
  min-height: var(--header-height);
  position: sticky;
  top: 0;
  z-index: 20;
}

.brand {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-inline: var(--page-gutter);
  text-decoration: none;
}

.brand__name {
  color: var(--ink-strong);
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: .3em;
  line-height: 1;
  text-transform: uppercase;
}

.brand__role {
  font-size: .55rem;
  letter-spacing: .45em;
  margin-top: .5rem;
  text-transform: uppercase;
}

.nav {
  align-items: stretch;
  display: flex;
}

.nav__link {
  align-items: center;
  display: flex;
  min-width: 5.2rem;
  padding: 0 1rem;
  position: relative;
  text-decoration: none;
}

.nav__link::after {
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

.nav__link:is(:hover, :focus-visible)::after,
.nav__link--active::after {
  scale: 1 1;
}

.signature {
  align-items: center;
  border-left: 1px solid var(--rule);
  display: flex;
  font-family: var(--font-note);
  font-size: 1.65rem;
  justify-content: center;
}

.signature__name {
  display: inline-block;
  rotate: -4deg;
}

.signature .signature__dash {
  font-family: var(--font-body);
  font-size: .75rem;
  margin-left: .6rem;
}

@media (max-width: 54rem) {
  .site-header {
    grid-template-columns: 1fr auto;
  }

  .signature {
    display: none;
  }

  .nav__link {
    min-width: auto;
    padding-inline: .75rem;
  }
}

@media (max-width: 40rem) {
  .site-header {
    position: relative;
  }

  .brand {
    padding: 1rem 1.25rem;
  }

  .nav {
    display: none;
  }
}
</style>
