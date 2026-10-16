<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { resolvedTheme, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    aria-label="Toggle color theme"
    :data-theme-state="resolvedTheme"
    @click="toggleTheme"
  >
    <svg v-if="resolvedTheme === 'light'" aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2.25M12 19.75V22M2 12h2.25M19.75 12H22M4.93 4.93l1.59 1.59M17.48 17.48l1.59 1.59M19.07 4.93l-1.59 1.59M6.52 17.48l-1.59 1.59" />
    </svg>
    <svg v-else aria-hidden="true" viewBox="0 0 24 24">
      <path d="M19.5 15.35A8 8 0 0 1 8.65 4.5 8 8 0 1 0 19.5 15.35Z" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  align-items: center;
  background: transparent;
  border: 0;
  border-left: 1px solid var(--rule);
  color: var(--text);
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  min-height: 2.75rem;
  min-width: 2.75rem;
  padding: 0;
}

.theme-toggle:focus-visible { outline-offset: -4px; }

.theme-toggle svg {
  fill: none;
  height: 1.25rem;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.4;
  transition: rotate var(--duration-medium) var(--ease-out);
  width: 1.25rem;
}

.theme-toggle:is(:hover, :focus-visible) svg { rotate: 18deg; }

@media (prefers-reduced-motion: reduce) {
  .theme-toggle svg { transition-duration: 0s; }
}

@media print {
  .theme-toggle { display: none !important; }
}
</style>
