<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { MouseBehaviour } from './types'

const props = withDefaults(defineProps<{
  normalStrength?: number
  fineStrength?: number
  fineKey?: string
  captureMouse?: boolean
  behaviour?: MouseBehaviour
  friction?: number
}>(), {
  normalStrength: 1,
  fineStrength: 0.1,
  fineKey: 'Alt',
  captureMouse: true,
  behaviour: MouseBehaviour.Flat,
  friction: 0.5,
})

const emits = defineEmits<{
  (e: 'change', delta: number): void
  (e: 'start'): void
  (e: 'end'): void
}>()

const el = ref<null | HTMLElement>(null)
const fine = ref(false)
const active = ref(false)
const currentVelocity = ref(0)
const velocityTimeout = ref<null | number>(null)

function handleMove(event: MouseEvent) {
  const magnitude = (event.movementX + (event.movementY * -1)) / 2 * (fine.value ? props.fineStrength : props.normalStrength)

  if (props.behaviour === MouseBehaviour.Flat) {
    emits('change', magnitude)
    return
  }

  currentVelocity.value += magnitude * 0.1
}

function handleVelocityChange() {
  if (Math.abs(currentVelocity.value) > 0.1)
    emits('change', currentVelocity.value)

  currentVelocity.value *= 1 - props.friction
  if (active.value)
    velocityTimeout.value = setTimeout(handleVelocityChange, 32) // 30 fps
  else
    currentVelocity.value = 0
}

function handleWindowBlur() {
  active.value = false
  fine.value = false
  emits('end')

  if (props.captureMouse)
    document.exitPointerLock()
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === props.fineKey)
    fine.value = true
}

function handleKeyUp(event: KeyboardEvent) {
  if (event.key === props.fineKey)
    fine.value = false
}

function handlePointerLockChange() {
  if (document.pointerLockElement === el.value)
    document.addEventListener('mousemove', handleMove, false)

  else
    document.removeEventListener('mousemove', handleMove, false)
}

function handleMouseUp() {
  if (props.captureMouse)
    document.exitPointerLock()
  else
    document.removeEventListener('mousemove', handleMove, false)

  active.value = false
  currentVelocity.value = 0
  emits('end')
}

onMounted(() => {
  if (props.captureMouse)
    document.addEventListener('pointerlockchange', handlePointerLockChange)

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  window.addEventListener('blur', handleWindowBlur)

  el.value?.addEventListener('mousedown', (event) => {
    event.stopPropagation()
    event.preventDefault()
    emits('start')

    if (props.captureMouse)
      el.value?.requestPointerLock()
    else
      document.addEventListener('mousemove', handleMove, false)

    active.value = true

    if (props.behaviour === MouseBehaviour.Velocity)
      handleVelocityChange()
  })

  document.addEventListener('mouseup', handleMouseUp, false)
})

onBeforeUnmount(() => {
  // Clean up any remaining listeners
  document.removeEventListener('pointerlockchange', handlePointerLockChange, false)
  document.removeEventListener('keyup', handleKeyUp, false)
  document.removeEventListener('keydown', handleKeyDown, false)
  document.removeEventListener('mousemove', handleMove, false)
  document.removeEventListener('mouseup', handleMouseUp, false)
  window.removeEventListener('blur', handleWindowBlur, false)

  if (velocityTimeout.value)
    clearTimeout(velocityTimeout.value)
})
</script>

<template>
  <div ref="el">
    <slot :fine="fine" :active="active" />
  </div>
</template>
