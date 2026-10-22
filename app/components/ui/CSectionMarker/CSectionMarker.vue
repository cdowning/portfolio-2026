<script setup lang="ts">
defineProps<{
  label?: string
  number: string
}>()
</script>

<template>
  <div class="section-marker" aria-hidden="true">
    <span v-if="label">{{ label }}</span>
    <strong>{{ number }}</strong>
  </div>
</template>

<style scoped>
.section-marker {
  border-right: 0;
  display: grid;
  font-size: var(--text-xs);
  gap: .45rem;
}

.section-marker span {
  font-size: var(--text-xs);
  letter-spacing: .3em;
  text-transform: uppercase;
}

.section-marker strong { font-size: inherit; font-weight: 400; }

@media (min-width: 40rem) {
  .section-marker { border-right: 1px solid var(--rule-strong); }
}
</style>
