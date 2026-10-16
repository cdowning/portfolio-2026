<script setup lang="ts">
withDefaults(defineProps<{
  animated?: boolean
  colors: readonly string[]
}>(), {
  animated: false,
})
</script>

<template>
  <div
    class="fabric-swatches"
    :class="{ 'fabric-swatches-animated': animated }"
    aria-hidden="true"
  >
    <span
      v-for="color in colors"
      :key="color"
      class="fabric-swatch"
      :style="{ backgroundColor: color }"
    />
  </div>
</template>

<style scoped>
.fabric-swatches {
  display: grid;
  gap: .45rem;
  width: 100%;
}

.fabric-swatch {
  --tooth: 3px;

  display: block;
  height: var(--swatch-height, 3.5rem);
  width: 100%;
  -webkit-mask:
    conic-gradient(from 135deg at top, transparent, #000 1deg 89deg, transparent 90deg)
      top / calc(2 * var(--tooth)) var(--tooth) repeat-x,
    conic-gradient(from -45deg at bottom, transparent, #000 1deg 89deg, transparent 90deg)
      bottom / calc(2 * var(--tooth)) var(--tooth) repeat-x,
    conic-gradient(from 45deg at left, transparent, #000 1deg 89deg, transparent 90deg)
      left / var(--tooth) calc(2 * var(--tooth)) repeat-y,
    conic-gradient(from 225deg at right, transparent, #000 1deg 89deg, transparent 90deg)
      right / var(--tooth) calc(2 * var(--tooth)) repeat-y,
    linear-gradient(#000 0 0) center /
      calc(100% - 2 * var(--tooth)) calc(100% - 2 * var(--tooth)) no-repeat;
  mask:
    conic-gradient(from 135deg at top, transparent, #000 1deg 89deg, transparent 90deg)
      top / calc(2 * var(--tooth)) var(--tooth) repeat-x,
    conic-gradient(from -45deg at bottom, transparent, #000 1deg 89deg, transparent 90deg)
      bottom / calc(2 * var(--tooth)) var(--tooth) repeat-x,
    conic-gradient(from 45deg at left, transparent, #000 1deg 89deg, transparent 90deg)
      left / var(--tooth) calc(2 * var(--tooth)) repeat-y,
    conic-gradient(from 225deg at right, transparent, #000 1deg 89deg, transparent 90deg)
      right / var(--tooth) calc(2 * var(--tooth)) repeat-y,
    linear-gradient(#000 0 0) center /
      calc(100% - 2 * var(--tooth)) calc(100% - 2 * var(--tooth)) no-repeat;
}

.fabric-swatches-animated .fabric-swatch { will-change: opacity, transform; }
.fabric-swatches-animated .fabric-swatch:nth-child(1) { opacity: var(--swatch-1-opacity, 1); transform: translateY(var(--swatch-1-shift, 0)); }
.fabric-swatches-animated .fabric-swatch:nth-child(2) { opacity: var(--swatch-2-opacity, 1); transform: translateY(var(--swatch-2-shift, 0)); }
.fabric-swatches-animated .fabric-swatch:nth-child(3) { opacity: var(--swatch-3-opacity, 1); transform: translateY(var(--swatch-3-shift, 0)); }
.fabric-swatches-animated .fabric-swatch:nth-child(4) { opacity: var(--swatch-4-opacity, 1); transform: translateY(var(--swatch-4-shift, 0)); }
</style>
