<script setup lang="ts" generic="T">
type TimelineKey = string | number | symbol

const {
  items,
  itemKey,
  isCurrent = () => false,
} = defineProps<{
  items: readonly T[]
  itemKey: (item: T, index: number) => TimelineKey
  isCurrent?: (item: T, index: number) => boolean
}>()

defineSlots<{
  default(props: { item: T, index: number, current: boolean }): unknown
}>()

const resolveCurrent = (item: T, index: number) => isCurrent(item, index)
</script>

<template>
  <ol class="timeline">
    <li
      v-for="(item, index) in items"
      :key="itemKey(item, index)"
      class="timeline-item"
      :aria-current="resolveCurrent(item, index) ? 'true' : undefined"
    >
      <span class="timeline-marker" aria-hidden="true" />
      <slot
        :item="item"
        :index="index"
        :current="resolveCurrent(item, index)"
      />
    </li>
  </ol>
</template>

<style scoped>
.timeline {
  --timeline-content-inset: 2rem;
  --timeline-axis-position: 0rem;
  --timeline-marker-block-offset: 50%;
  --timeline-item-min-size: 4rem;
  --timeline-marker-size: .625rem;

  list-style: none;
  margin: 0;
  padding: 0 0 0 var(--timeline-content-inset);
  position: relative;
}

.timeline::before {
  background: var(--rule-strong);
  bottom: 0;
  content: '';
  left: var(--timeline-axis-position);
  position: absolute;
  top: 0;
  width: 1px;
}

.timeline-item {
  min-height: var(--timeline-item-min-size);
  position: relative;
}

.timeline-marker {
  background: var(--canvas);
  border: 1px solid var(--text);
  border-radius: 50%;
  height: var(--timeline-marker-size);
  left: calc(var(--timeline-axis-position) - var(--timeline-content-inset) - (var(--timeline-marker-size) / 2));
  position: absolute;
  top: var(--timeline-marker-block-offset);
  transform: translateY(-50%);
  width: var(--timeline-marker-size);
  z-index: 1;
}

.timeline-item[aria-current='true'] .timeline-marker {
  background: var(--text);
}
</style>
