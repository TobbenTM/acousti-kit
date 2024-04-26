<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  normalStrength?: number
  fineStrength?: number
  fineKey?: string
}>(), {
  normalStrength: 1,
  fineStrength: 0.1,
  fineKey: 'Alt',
})

const emits = defineEmits<{
  (e: 'change', delta: number): void
}>()

const el = ref<null | HTMLElement>(null)
const fine = ref(false)
const active = ref(false)

function handleMove(event: MouseEvent) {
  emits('change', (event.movementX + (event.movementY * -1)) / 2 * (fine.value ? props.fineStrength : props.normalStrength))
}

function handleWindowBlur() {
  active.value = false
  fine.value = false
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
  if (document.pointerLockElement === el.value) {
    document.addEventListener('mousemove', handleMove, false)
    active.value = true
  }
  else {
    document.removeEventListener('mousemove', handleMove, false)
    active.value = false
  }
}

onMounted(() => {
  document.addEventListener('pointerlockchange', handlePointerLockChange)
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
  window.addEventListener('blur', handleWindowBlur)

  el.value?.addEventListener('mousedown', (event) => {
    event.stopPropagation()
    el.value?.requestPointerLock()
  })

  el.value?.addEventListener('mouseup', (event) => {
    event.stopPropagation()
    document.exitPointerLock()
  })
})

onBeforeUnmount(() => {
  // Clean up any remaining listeners
  document.removeEventListener('pointerlockchange', handlePointerLockChange, false)
  document.removeEventListener('keyup', handleKeyUp, false)
  document.removeEventListener('keydown', handleKeyDown, false)
  document.removeEventListener('mousemove', handleMove, false)
  window.removeEventListener('blur', handleWindowBlur, false)
})
</script>

<template>
  <div ref="el">
    <slot :fine="fine" :active="active" />
  </div>
</template>
