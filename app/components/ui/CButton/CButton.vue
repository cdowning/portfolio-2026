<script setup lang="ts">
withDefaults(defineProps<{
  ariaLabel?: string
  external?: boolean
  href?: string
  size?: 'regular' | 'large'
  tone?: 'gold' | 'ink'
}>(), {
  ariaLabel: undefined,
  external: false,
  href: undefined,
  size: 'regular',
  tone: 'gold',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <a
    v-if="href"
    class="action-control"
    :class="[`action-control--${tone}`, `action-control--${size}`]"
    :href="href"
    :aria-label="ariaLabel"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noreferrer' : undefined"
    @click="emit('click', $event)"
  >
    <span><slot /></span><i class="action-control__arrow" aria-hidden="true" />
  </a>
  <button
    v-else
    class="action-control"
    :class="[`action-control--${tone}`, `action-control--${size}`]"
    type="button"
    :aria-label="ariaLabel"
    @click="emit('click', $event)"
  >
    <span><slot /></span><i class="action-control__arrow" aria-hidden="true" />
  </button>
</template>

<style scoped>
.action-control {
  align-items: center;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  font-weight: 600;
  gap: 2rem;
  justify-content: space-between;
  min-height: 3.5rem;
  padding: 0 1.4rem;
  text-decoration: none;
}

.action-control--large { font-size: 1.1rem; min-height: 4.2rem; padding-inline: 2rem; }
.action-control--gold { background: var(--gold); color: var(--ink-strong); }
.action-control--ink { background: var(--ink-strong); color: var(--paper); }

.action-control__arrow {
  display: block;
  height: 1px;
  position: relative;
  transition: translate var(--duration-fast) var(--ease-out);
  width: 1.15rem;
}

.action-control__arrow,
.action-control__arrow::before,
.action-control__arrow::after { background: currentcolor; }

.action-control__arrow::before,
.action-control__arrow::after {
  content: '';
  height: 1px;
  position: absolute;
  right: 0;
  width: .45rem;
}

.action-control__arrow::before { rotate: 45deg; transform-origin: right; }
.action-control__arrow::after { rotate: -45deg; transform-origin: right; }
.action-control:is(:hover, :focus-visible) .action-control__arrow { translate: .25rem 0; }

@media (prefers-reduced-motion: reduce) {
  .action-control__arrow { transition-duration: 0s; }
}
</style>
