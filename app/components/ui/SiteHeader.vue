<script setup lang="ts">
import { computed } from 'vue'

import { useActiveSection } from '~/composables/useActiveSection'
import { useMobileNavigation } from '~/composables/useMobileNavigation'
import type { NavigationItem } from '~/types/content'

defineProps<{
  items: NavigationItem[]
}>()

const route = useRoute()
const { activeSection } = useActiveSection()
const { close, isOpen, toggle, trigger } = useMobileNavigation()

const triggerLabel = computed(() => isOpen.value ? 'Close navigation' : 'Open navigation')

function currentState(item: NavigationItem): 'page' | 'location' | undefined {
  if (route.path === '/resume' && item.href === '/resume') return 'page'
  if (route.path !== '/') return undefined
  if (item.href === `/#${activeSection.value}`) return 'location'
  return undefined
}
</script>

<template>
  <header class="site-header">
    <NuxtLink class="brand" to="/" aria-label="Caitlin Hawley, home" @click="close()">
      <strong>Caitlin Hawley</strong>
      <span>Frontend developer</span>
    </NuxtLink>

    <button
      ref="trigger"
      class="nav-trigger"
      type="button"
      aria-controls="primary-navigation"
      :aria-expanded="isOpen"
      :aria-label="triggerLabel"
      @click="toggle"
    >
      <span aria-hidden="true"><i /><i /></span>
    </button>

    <nav
      id="primary-navigation"
      class="primary-nav"
      :class="{ 'primary-nav--open': isOpen }"
      aria-label="Primary"
    >
      <a
        v-for="item in items"
        :key="item.label"
        class="primary-nav__link"
        :aria-current="currentState(item)"
        :href="item.href"
        @click="close()"
      >
        <span>{{ item.label }}</span>
        <i aria-hidden="true" />
      </a>
    </nav>

    <div class="signature" aria-hidden="true"><span>Caitlin</span><i>—</i></div>
  </header>
</template>

<style scoped>
.site-header {
  align-items: stretch;
  background: color-mix(in srgb, var(--paper) 95%, transparent);
  display: grid;
  grid-template-columns: minmax(17rem, 1fr) auto 12rem;
  min-height: var(--header-height);
  position: sticky;
  top: 0;
  z-index: 40;
}

.site-header::after {
  background: var(--rule);
  bottom: 0;
  content: '';
  height: 1px;
  left: 50%;
  pointer-events: none;
  position: absolute;
  transform: translateX(-50%);
  width: 100vw;
}

.brand {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-inline: var(--page-gutter);
  text-decoration: none;
}

.brand strong {
  color: var(--ink-strong);
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: .3em;
  line-height: 1;
  text-transform: uppercase;
}

.brand > span {
  font-size: .55rem;
  letter-spacing: .45em;
  margin-top: .5rem;
  text-transform: uppercase;
}

.primary-nav { align-items: stretch; display: flex; }

.primary-nav__link {
  align-items: center;
  display: flex;
  min-width: 5.2rem;
  padding: 0 1rem;
  position: relative;
  text-decoration: none;
}

.primary-nav__link::after {
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

.primary-nav__link:is(:hover, :focus-visible)::after,
.primary-nav__link[aria-current]::after { scale: 1 1; }

.primary-nav__link i { display: none; font-style: normal; }

.signature {
  align-items: center;
  border-left: 1px solid var(--rule);
  display: flex;
  font-family: var(--font-note);
  font-size: 1.65rem;
  justify-content: center;
}

.signature span { display: inline-block; rotate: -4deg; }
.signature i { font-family: var(--font-body); font-size: .75rem; font-style: normal; margin-left: .6rem; }
.nav-trigger { display: none; }

@media (max-width: 54rem) {
  .site-header { grid-template-columns: 1fr auto; }
  .signature { display: none; }
  .primary-nav__link { min-width: auto; padding-inline: .75rem; }
}

@media (max-width: 40rem) {
  .site-header {
    grid-template-columns: 1fr 4.5rem;
    min-height: 4.5rem;
  }

  .brand { padding: .85rem 1.25rem; }
  .brand strong { font-size: .75rem; }
  .brand > span { font-size: .45rem; letter-spacing: .36em; margin-top: .35rem; }

  .nav-trigger {
    align-items: center;
    background: transparent;
    border: 0;
    border-left: 1px solid var(--rule);
    cursor: pointer;
    display: flex;
    justify-content: center;
    min-height: 4.5rem;
    min-width: 4.5rem;
    padding: 0;
    position: relative;
    z-index: 2;
  }

  .nav-trigger > span { display: grid; gap: .42rem; width: 1.4rem; }
  .nav-trigger i { background: var(--ink); display: block; height: 1px; transition: rotate var(--duration-fast), translate var(--duration-fast); }
  .nav-trigger[aria-expanded="true"] i:first-child { rotate: 45deg; translate: 0 .22rem; }
  .nav-trigger[aria-expanded="true"] i:last-child { rotate: -45deg; translate: 0 -.22rem; }

  .primary-nav {
    align-content: start;
    background: var(--paper-deep);
    border-bottom: 1px solid var(--rule);
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: 1fr;
    left: 0;
    min-height: calc(100svh - 4.5rem);
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 100%;
    transform: translateY(-.75rem);
    transition: opacity 220ms var(--ease-out), transform 320ms var(--ease-out);
    visibility: hidden;
  }

  .primary-nav--open { opacity: 1; pointer-events: auto; transform: none; visibility: visible; }

  .primary-nav__link {
    border-top: 1px solid var(--rule);
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 9vw, 2.5rem);
    justify-content: space-between;
    min-height: 4.75rem;
    padding: .75rem 1.25rem;
  }

  .primary-nav__link::after { bottom: 0; left: 1.25rem; right: 1.25rem; }
  .primary-nav__link i {
    background: var(--ink);
    display: block;
    height: 1px;
    position: relative;
    width: 1.1rem;
  }

  .primary-nav__link i::before,
  .primary-nav__link i::after {
    background: var(--ink);
    content: '';
    height: 1px;
    position: absolute;
    right: 0;
    width: .4rem;
  }

  .primary-nav__link i::before { rotate: 45deg; transform-origin: right; }
  .primary-nav__link i::after { rotate: -45deg; transform-origin: right; }
}

@media (prefers-reduced-motion: reduce) {
  .nav-trigger i,
  .primary-nav { transition-duration: 0s; }
}
</style>
