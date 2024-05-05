<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { KnobAssetStackCanvasRenderer } from './renderer'
import { TrackBehaviour } from './types'

const props = withDefaults(defineProps<{
  width: number
  height: number
  minDegrees?: number
  maxDegrees?: number
  percentage: number
  backgroundSvg?: string
  trackSvg?: string
  handleSvg: string
  trackMode?: TrackBehaviour
}>(), {
  minDegrees: -140,
  maxDegrees: 140,
  trackMode: TrackBehaviour.Clip,
})

const canvas = ref<null | HTMLCanvasElement>(null)
const renderer = ref<null | KnobAssetStackCanvasRenderer>(null)

watch(() => props.percentage, (updatedPercentage) => {
  if (renderer.value)
    renderer.value.update(updatedPercentage)
}, { immediate: true })

onMounted(async () => {
  if (!canvas.value)
    throw new Error('Canvas element could not mount')

  renderer.value = await KnobAssetStackCanvasRenderer.create(
    canvas.value,
    {
      minDegrees: props.minDegrees,
      maxDegrees: props.maxDegrees,
      trackMode: props.trackMode,
      backgroundSvg: props.backgroundSvg,
      trackSvg: props.trackSvg,
      handleSvg: props.handleSvg,
    },
  )
  renderer.value.update(props.percentage)
})

onBeforeUnmount(() => {
  if (renderer.value)
    renderer.value.destroy()
})
</script>

<template>
  <canvas
    ref="canvas"
    :width="width"
    :height="height"
  />
</template>
