<script setup lang="ts">
import { computed } from 'vue'
import MouseControl from './MouseControl.vue'

const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
  normalStrength?: number
  fineStrength?: number
  fineKey?: string
}>(), {
  min: 0,
  max: 100,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

function handleChange(delta: number) {
  const newValue = delta < 0
    ? Math.max(props.min, props.modelValue + delta)
    : Math.min(props.max, props.modelValue + delta)
  emit('update:modelValue', Math.round(newValue))
}

const percentage = computed(() => (props.max - props.min) / 100 * (props.modelValue - props.min))
</script>

<template>
  <div class="container">
    <MouseControl
      v-slot="{ fine, active }"
      class="knob"
      :normal-strength="normalStrength"
      :fine-strength="fineStrength"
      :fine-key="fineKey"
      @change="handleChange"
    >
      <slot
        :value="modelValue"
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
