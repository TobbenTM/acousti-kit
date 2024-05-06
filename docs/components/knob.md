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
import { Knob } from 'acousti-kit'

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
import BackgroundComponent from '../assets/example-knob/background.svg'
import HandleComponent from '../assets/example-knob/handle.svg'
import TrackComponent from '../assets/example-knob/track.svg'
import Background from '../assets/example-knob/background.svg?raw'
import Handle from '../assets/example-knob/handle.svg?raw'
import Track from '../assets/example-knob/track.svg?raw'

const volume = ref(100)
</script>

<Knob v-model="volume" />

Volume: {{ volume }}

## Props

The following props are available for the `<Knob />` component:

| Prop             | Type                   | Default  | Optional | Note                                                                      |
| ---------------- | ---------------------- | -------- | -------- | ------------------------------------------------------------------------- |
| `modelValue`     | `number`               |          | No       | Used for two-way data binding                                             |
| `min`            | `number`               | `0`      | Yes      | The minimum value of the knob                                             |
| `max`            | `number`               | `100`    | Yes      | The maximum value of the knob                                             |
| `tabIndex`       | `number`               | `0`      | Yes      | Sets the tabindex for assistive technologies                              |
| `normalStrength` | `number`               | `0`      | Yes      | Configures the normal strength of mouse movement effect on value          |
| `fineStrength`   | `number`               | `0`      | Yes      | Configures the fine adjustment strength of mouse movement effect on value |
| `fineKey`        | `string`               | `Alt`    | Yes      | Sets the key used for enabling fine adjustment                            |
| `captureMouse`   | `boolean`              | `true`   | Yes      | Enables mouse capture when adjusting                                      |
| `mouseBehaviour` | `'Flat' \| 'Velocity'` | `'Flat'` | Yes      | Configures the mouse control mode                                         |

## Events

The following events are available for the `<Knob />` component:

| Prop                 | Type     | Note                                                       |
| -------------------- | -------- | ---------------------------------------------------------- |
| `@update:modelValue` | `number` | Emitted on any value update, used for two-way data binding |
| `@start`             | `void`   | Emitted when the user starts adjusting                     |
| `@end`               | `void`   | Emitted when the user ends adjusting                       |

## Advanced Usage

The component comes with a couple of features that are all adjustable:

### Mouse capture

By default, the knob will capture the mouse pointer to prevent it leaving the position while adjusting the knob.
This can be turned off using the `capture-mouse` prop:

```vue
<template>
  <Knob
    v-model="volume"
    :capture-mouse="false"
  />
</template>
```

Example:

<Knob
  v-model="volume"
  :capture-mouse="false"
/>

Volume: {{ volume }}

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

### Mouse mode

The knob supports two different kinds of mouse adjustment modes:

1. **Flat**: This is the default, and changes the value with as much as the mouse moves
1. **Velocity**: An alternative move where instead the velocity of the mouse is being considered

For more details on this, check the documentation of the [MouseControl](./mouse-control.md) component which is being used internally by the `<Knob />`. To change to the Velocity mode, use the `mouse-behaviour` prop:

```vue
<template>
  <Knob
    v-model="volume"
    mouse-behaviour="Velocity"
  />
</template>
```

Example:

<Knob
  v-model="volume"
  mouse-behaviour="Velocity"
/>

Volume: {{ volume }}

### Specific min/max

If you have a different range than 0 to 100, you can use the `min` and `max` props to tweak the range:

```vue
<template>
  <Knob
    v-model="volume"
    :min="10"
    :max="420"
  />
</template>
```

Example:

<Knob
  v-model="volume"
  :min="10"
  :max="420"
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

The component assumes all layers are the same size, and simplifies common implementations by automatically stacking them on top of each other. While the background layer remains static at all times, the track will either allow clipping, or fill up behind the handle, and the handle will rotate with the value. To ensure performance, this is being rendered in a canvas element to keep all transformations in-sync.

<Knob
  v-slot="{ percentage }"
  v-model="volume"
>
  <KnobAssetStack
    :width="128"
    :height="128"
    :min-degrees="-140"
    :max-degrees="140"
    :percentage="percentage"
    :background-svg="Background"
    :track-svg="Track"
    :handle-svg="Handle"
  />
</Knob>

Volume: {{ volume }}

This example is composed of the following three layers (background, track, handle) using the default clipping mode for the track to expose the background:

<div :style="{ display: 'flex' }">
  <BackgroundComponent :style="{ height: '64px', marginRight: '8px' }" />
  <TrackComponent :style="{ height: '64px', marginRight: '8px' }" />
  <HandleComponent :style="{ height: '64px' }" />
</div>

If you have a track asset that should instead be shown as the handle moves, you can change the `track-mode` of the asset stack component to `Fill`.

```vue
<script setup>
import { ref } from 'vue'
import { Knob, KnobAssetStack } from 'acousti-kit'
import Background from '../assets/example-knob/background.svg?raw'
import Handle from '../assets/example-knob/handle.svg?raw'
import Track from '../assets/example-knob/track.svg?raw'

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
      :background-svg="Background"
      :track-svg="Track"
      :handle-svg="Handle"
    />
  </Knob>
</template>
```
