<script setup lang="ts">
import { type Component, computed } from 'vue'

const props = withDefaults(defineProps<{
  minDegrees?: number
  maxDegrees?: number
  percentage: number
  background?: Component
  track?: Component
  handle: Component
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
  <div>
    <component
      :is="background"
      v-if="background"
      class="background"
    />
    <component
      :is="track"
      v-if="track"
      class="track"
    />
    <component
      :is="handle"
      class="handle"
    />
  </div>
</template>

<style scoped>
div {
  position: relative;

  .background {
    width: 100%;
    height: 100%;
  }

  .track, .handle, .mask {
    position: absolute;
    inset: 0;
    transition: transform .1s ease, color .25s ease, mask .1s ease;
  }

  .handle {
    transform: rotate(calc(v-bind(currentRotation)*1deg));
  }

  .track {
    /* TODO: Find something that matches the performance of the transform better */
    mask: conic-gradient(from -180deg at 50% 50%, #000 0deg calc(v-bind(currentDeltaRotation)*1deg), #0000 calc(v-bind(currentDeltaRotation)*1deg) 360deg);
  }

  .mask {
    /* For testing purposes only */
    /* background: conic-gradient(from -180deg at 50% 50%, #0000 0deg calc(v-bind(currentDeltaRotation)*1deg), red calc(v-bind(currentDeltaRotation)*1deg) 360deg); */
  }
}
</style>
