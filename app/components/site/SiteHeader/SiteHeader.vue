<script setup lang="ts">
import { computed } from 'vue'

import ThemeToggle from '~/components/site/ThemeToggle/ThemeToggle.vue'
import type { NavigationItem } from '~/types/content'

import { useActiveSection } from './useActiveSection'
import { useMobileNavigation } from './useMobileNavigation'

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

    <div class="header-theme">
      <ThemeToggle border="mobile" />
    </div>

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
      :class="{ 'primary-nav-open': isOpen }"
      aria-label="Primary"
    >
      <a
        v-for="item in items"
        :key="item.label"
        class="primary-nav-link"
        :aria-current="currentState(item)"
        :href="item.href"
        @click="close()"
      >
        <span>{{ item.label }}</span>
        <i aria-hidden="true" />
      </a>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  align-items: stretch;
  background: color-mix(in srgb, var(--canvas) 95%, transparent);
  display: grid;
  grid-template-areas: 'brand theme trigger';
  grid-template-columns: minmax(0, 1fr) 4.5rem 4.5rem;
  min-height: 4.5rem;
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
  grid-area: brand;
  justify-content: center;
  min-width: 0;
  padding: .85rem 1.25rem;
  text-decoration: none;
}

.brand strong {
  color: var(--text-strong);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  letter-spacing: .2em;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
}

.brand > span {
  font-size: var(--text-xs);
  letter-spacing: .14em;
  margin-top: .35rem;
  text-transform: uppercase;
  white-space: nowrap;
}

.primary-nav {
  align-content: start;
  background: var(--surface);
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

.primary-nav-open { opacity: 1; pointer-events: auto; transform: none; visibility: visible; }

.primary-nav-link {
  align-items: center;
  border-top: 1px solid var(--rule);
  display: flex;
  font-family: var(--font-display);
  font-size: clamp(var(--text-xl), 9vw, var(--text-3xl));
  justify-content: space-between;
  min-height: 4.75rem;
  padding: .75rem 1.25rem;
  position: relative;
  text-decoration: none;
}

.primary-nav-link::after {
  background: var(--action);
  bottom: 0;
  content: '';
  height: 2px;
  left: 1.25rem;
  position: absolute;
  right: 1.25rem;
  scale: 0 1;
  transform-origin: left;
  transition: scale var(--duration-fast) var(--ease-out);
}

.primary-nav-link:is(:hover, :focus-visible)::after,
.primary-nav-link[aria-current]::after { scale: 1 1; }

.primary-nav-link i {
  background: var(--text);
  display: block;
  font-style: normal;
  height: 1px;
  position: relative;
  width: 1.1rem;
}

.primary-nav-link i::before,
.primary-nav-link i::after {
  background: var(--text);
  content: '';
  height: 1px;
  position: absolute;
  right: 0;
  width: .4rem;
}

.primary-nav-link i::before { rotate: 45deg; transform-origin: right; }
.primary-nav-link i::after { rotate: -45deg; transform-origin: right; }

.header-theme { display: grid; grid-area: theme; }
.nav-trigger {
  align-items: center;
  background: transparent;
  border: 0;
  border-left: 1px solid var(--rule);
  cursor: pointer;
  display: flex;
  grid-area: trigger;
  justify-content: center;
  min-height: 4.5rem;
  min-width: 4.5rem;
  padding: 0;
  position: relative;
  z-index: 2;
}

.nav-trigger > span { display: grid; gap: .42rem; width: 1.4rem; }
.nav-trigger i { background: var(--text); display: block; height: 1px; transition: rotate var(--duration-fast), translate var(--duration-fast); }
.nav-trigger[aria-expanded="true"] i:first-child { rotate: 45deg; translate: 0 .22rem; }
.nav-trigger[aria-expanded="true"] i:last-child { rotate: -45deg; translate: 0 -.22rem; }

@media (min-width: 48rem) {
  .site-header {
    grid-template-areas: 'brand navigation theme';
    grid-template-columns: 1fr auto 4.5rem;
    min-height: var(--header-height);
  }

  .brand {
    min-width: auto;
    padding: 0 var(--page-gutter);
  }

  .brand strong { font-size: var(--text-base); letter-spacing: .3em; white-space: normal; }
  .brand > span { letter-spacing: .45em; margin-top: .5rem; white-space: normal; }
  .nav-trigger { display: none; }

  .primary-nav {
    align-items: stretch;
    background: transparent;
    border-bottom: 0;
    display: flex;
    grid-area: navigation;
    min-height: 0;
    opacity: 1;
    pointer-events: auto;
    position: static;
    transform: none;
    visibility: visible;
  }

  .primary-nav-link {
    border-top: 0;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    justify-content: flex-start;
    min-height: 0;
    min-width: auto;
    padding: 0 .75rem;
  }

  .primary-nav-link::after { bottom: .75rem; left: .75rem; right: .75rem; }
  .primary-nav-link i { display: none; }
}

@media (min-width: 80rem) {
  .site-header {
    grid-template-columns: minmax(17rem, 1fr) auto 3.25rem;
  }

  .primary-nav-link { min-width: 5.2rem; padding-inline: 1rem; }
  .primary-nav-link::after { left: 1rem; right: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .nav-trigger i,
  .primary-nav { transition-duration: 0s; }
}
</style>
