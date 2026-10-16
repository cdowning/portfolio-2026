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
    class="button"
    :class="[`button-${tone}`, `button-${size}`]"
    :href="href"
    :aria-label="ariaLabel"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noreferrer' : undefined"
    @click="emit('click', $event)"
  >
    <span><slot /></span><i class="button-arrow" aria-hidden="true" />
  </a>
  <button
    v-else
    class="button"
    :class="[`button-${tone}`, `button-${size}`]"
    type="button"
    :aria-label="ariaLabel"
    @click="emit('click', $event)"
  >
    <span><slot /></span><i class="button-arrow" aria-hidden="true" />
  </button>
</template>

<style scoped>
.button {
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
  transition: background-color var(--duration-fast) var(--ease-out);
}

.button-large { font-size: var(--text-md); min-height: 4.2rem; padding-inline: 2rem; }
.button-gold { background: var(--action); color: var(--on-action); }
.button-ink { background: var(--footer-action); color: var(--on-footer-action); }
.button-gold:is(:hover, :focus-visible) { background: var(--action-hover); }

.button-arrow {
  display: block;
  height: 1px;
  position: relative;
  transition: translate var(--duration-fast) var(--ease-out);
  width: 1.15rem;
}

.button-arrow,
.button-arrow::before,
.button-arrow::after { background: currentcolor; }

.button-arrow::before,
.button-arrow::after {
  content: '';
  height: 1px;
  position: absolute;
  right: 0;
  width: .45rem;
}

.button-arrow::before { rotate: 45deg; transform-origin: right; }
.button-arrow::after { rotate: -45deg; transform-origin: right; }
.button:is(:hover, :focus-visible) .button-arrow { translate: .25rem 0; }

@media (prefers-reduced-motion: reduce) {
  .button-arrow { transition-duration: 0s; }
}
</style>
