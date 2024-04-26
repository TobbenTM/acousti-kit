---
outline: deep
---

# Knob Component

The `<Knob />` component is a useful tool for accepting user input for single values.

## Basic Usage

Its most basic usage merely requires a `v-model` binding (or alternatively a `:model-value` and `@update:model-value` bindings):

```vue
<script setup>
import { ref } from 'vue'
import { Knob, KnobAssetStack } from 'acousti-kit'

const volume = ref(100)
</script>

<template>
  <Knob v-model="volume" />
</template>
```

It will automatically lock the pointer to the knob, making sure all mouse movements are registered for the knob value changes.

## Example

<script setup>
import { ref } from 'vue'
import { Knob, KnobAssetStack } from '../../src'
import Background from '../assets/example-knob/background.svg'
import Handle from '../assets/example-knob/handle.svg'
import Track from '../assets/example-knob/track.svg'

const volume = ref(100)
</script>

<Knob v-model="volume" />

Volume: {{ volume }}

## Advanced Usage

The component comes with a couple of features that are all adjustable:

### Fine Adjustment

To enable finer input control, the knob will by default scale down the intensity of change when the `Alt` key is held down.
Both the key and the intensity can be configured:

```vue
<template>
  <Knob
    v-model="volume"
    :normal-strength="10"
    :fine-strength="0.1"
    fine-key="Control"
  />
</template>
```

Example:

<Knob
  v-model="volume"
  :normal-strength="10"
  :fine-strength="0.1"
  fine-key="Control"
/>

Volume: {{ volume }}

### Custom Design

The component is made to be used with a supplied component as the knob itself, and what is seen here is just the default fallback. To provide your own, you can use the slot, and the scoped props to render what you want:

```vue
<template>
  <Knob
    v-slot="{ percentage, fine, active }"
    v-model="volume"
  >
    <div
      :style="{
        transform: `rotate(${(50 - percentage) * -2.75}deg)`,
        background: `hsl(${percentage}, ${active ? '100%' : '25%'}, ${fine ? '50%' : '75%'})`,
        transition: 'all .1s ease',
        height: '42px',
        width: '42px',
      }"
    />
  </Knob>
</template>
```

Example:

<Knob
  v-slot="{ percentage, fine, active }"
  v-model="volume"
>
  <div
    :style="{
      transform: `rotate(${(50 - percentage) * -2.75}deg)`,
      background: `hsl(${percentage}, ${active ? '100%' : '25%'}, ${fine ? '50%' : '75%'})`,
      transition: 'transform .1s ease, color .5s ease',
      height: '42px',
      width: '42px',
    }"
  />
</Knob>

Volume: {{ volume }}

Using this pattern, you can easily supply your own graphics, making knobs fit whatever style you might have. And to make that easier, there is also a `<KnobAssetStack />` component that implements the common pattern where you have 3 layers:

1. An optional background layer
1. An optional "track" for the knob
1. A "handle" for the knob

The component assumes all layers are the same size, and simplifies common implementations by automatically stacking them on top of each other. While the background layer remains static at all times, the track will fill up behind the handle, and the handle will rotate with the value.

<Knob
  v-slot="{ percentage }"
  v-model="volume"
>
  <KnobAssetStack
    :style="{
      width: '128px',
      height: '128px',
    }"
    :min-degrees="-140"
    :max-degrees="140"
    :percentage="percentage"
    :background="Background"
    :track="Track"
    :handle="Handle"
  />
</Knob>

Volume: {{ volume }}

```vue
<script setup>
import { ref } from 'vue'
import { Knob, KnobAssetStack } from 'acousti-kit'
import Background from '../assets/example-knob/background.svg'
import Handle from '../assets/example-knob/handle.svg'
import Track from '../assets/example-knob/track.svg'

const volume = ref(100)
</script>

<template>
  <Knob
    v-slot="{ percentage }"
    v-model="volume"
  >
    <KnobAssetStack
      :style="{
        width: '128px',
        height: '128px',
      }"
      :min-degrees="-140"
      :max-degrees="140"
      :percentage="percentage"
      :background="Background"
      :track="Track"
      :handle="Handle"
    />
  </Knob>
</template>
```
