<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  minDegrees?: number
  maxDegrees?: number
  percentage: number
}>(), {
  minDegrees: -140,
  maxDegrees: 140,
})

const currentRotation = computed(() => {
  const range = (props.maxDegrees - props.minDegrees)
  const delta = range * (50 - props.percentage) / 100 * -1
  return delta
})

const currentDeltaRotation = computed(() => currentRotation.value - props.minDegrees + (props.minDegrees + 180))
</script>

<template>
  <div class="stack">
    <div class="background">
      <slot name="background" />
    </div>
    <div class="track">
      <slot name="track" />
    </div>
    <div class="handle">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.stack {
  position: relative;

  .background {
    width: 100%;
    height: 100%;
  }

  .track, .handle {
    position: absolute;
    inset: 0;
  }

  .handle {
    transform: rotate(calc(v-bind(currentRotation)*1deg));
  }

  .track {
    mask: conic-gradient(from -180deg at 50% 50%, #000 0deg calc(v-bind(currentDeltaRotation)*1deg), #0000 calc(v-bind(currentDeltaRotation)*1deg) 360deg);
  }
}
</style>
