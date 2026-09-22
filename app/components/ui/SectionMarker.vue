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
  border-right: 1px solid var(--rule-strong);
  display: grid;
  font-size: .7rem;
  gap: .45rem;
}

.section-marker span {
  font-size: .55rem;
  letter-spacing: .3em;
  text-transform: uppercase;
}

.section-marker strong { font-size: inherit; font-weight: 400; }
</style>
