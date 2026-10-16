<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  variant?: 'soft' | 'ruled'
}>(), {
  variant: 'soft',
})
</script>

<template>
  <li class="tag" :class="`tag-${variant}`">{{ label }}</li>
</template>

<style scoped>
.tag {
  font-size: var(--tag-font-size, var(--text-xs));
  min-height: var(--tag-min-height, 2.1rem);
  min-width: var(--tag-min-width, 0);
  padding: var(--tag-padding, .55rem .75rem);
  text-align: var(--tag-text-align, center);
}

.tag-soft {
  background: var(--tag-background, var(--support-wash));
  color: var(--text);
}

.tag-ruled {
  border-left: 1px solid var(--rule-strong);
}
</style>
