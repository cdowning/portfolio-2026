<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  variant?: 'soft' | 'ruled'
}>(), {
  variant: 'soft',
})
</script>

<template>
  <li class="skill-tag" :class="`skill-tag--${variant}`">{{ label }}</li>
</template>

<style scoped>
.skill-tag {
  font-size: .72rem;
  min-height: 2.1rem;
  padding: .55rem .75rem;
}

.skill-tag--soft {
  background: var(--support-wash);
  color: var(--text);
  text-align: center;
}

.skill-tag--ruled {
  border-left: 1px solid var(--rule-strong);
}
</style>
