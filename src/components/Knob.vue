<script setup lang="ts">
import { computed, ref } from 'vue'
import MouseControl from './MouseControl/MouseControl.vue'
import type { MouseBehaviour } from './MouseControl/types'

const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
  tabIndex?: number
  normalStrength?: number
  fineStrength?: number
  fineKey?: string
  captureMouse?: boolean
  mouseBehaviour?: MouseBehaviour
}>(), {
  min: 0,
  max: 100,
  tabIndex: 0,
  captureMouse: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'start'): void
  (e: 'end'): void
}>()

const container = ref<null | HTMLElement>(null)
const active = ref(false)

function clamp(value: number) {
  return Math.min(props.max, Math.max(props.min, value))
}

function handleChange(delta: number) {
  const newValue = clamp(props.modelValue + delta)
  emit('update:modelValue', Math.round(newValue))
}

function handleKeyDown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      event.stopPropagation()
      handleChange(1)
      break
    case 'ArrowDown':
      event.preventDefault()
      event.stopPropagation()
      handleChange(-1)
      break
  }
}

function onStart() {
  emit('start')
  active.value = true
  container.value?.focus()
}

function onEnd() {
  container.value?.blur()
  active.value = false
  emit('end')
}

const percentage = computed(() => 100 / (props.max - props.min) * (clamp(props.modelValue) - props.min))
</script>

<template>
  <div
    ref="container"
    class="container"
    :class="active ? 'active' : ''"
    :tabindex="tabIndex"
    @keydown="handleKeyDown"
  >
    <MouseControl
      v-slot="{ fine }"
      class="knob"
      :normal-strength="normalStrength"
      :fine-strength="fineStrength"
      :fine-key="fineKey"
      :capture-mouse="captureMouse"
      :behaviour="mouseBehaviour"
      @change="handleChange"
      @start="onStart"
      @end="onEnd"
    >
      <slot
        :value="clamp(props.modelValue)"
        :percentage="percentage"
        :fine="fine"
        :active="active"
      >
        <div
          class="knob__default"
          :style="{
            transform: `rotate(${(50 - percentage) * -2.75}deg)`,
            border: fine ? '1px solid green' : '1px solid transparent',
          }"
        />
      </slot>
    </MouseControl>
  </div>
</template>

<style scoped>
.container {
  display: inline-block;
  cursor: pointer;

  &.active {
    outline: none;
  }
}

.knob {
  .knob__default {
    background: #666;
    border-radius: 50%;
    height: 32px;
    width: 32px;
    position: relative;
    transition: transform .1s ease;

    &::after {
      display: block;
      content: '';
      position: absolute;
      top: 2px;
      left: calc(50% - 1px);
      width: 2px;
      height: 8px;
      background: #000;
      border-radius: 50;
    }
  }
}
</style>
