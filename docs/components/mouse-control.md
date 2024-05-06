---
outline: deep
---

# MouseControl Component

The `<MouseControl />` component is a tool to add complex mouse control to any custom component. It is used internally by several of the other components in this package.

## Basic Usage

The main output of the `<MouseControl />` is a `change` event, with a delta value representing the change in input. This change is derived from mouse movement, where positive X and negative Y (right and up) movement contributes to an increased delta.

```vue
<script setup>
import { ref } from 'vue'
import { MouseControl } from 'acousti-kit'

const delta = ref(0)
</script>

<template>
  <MouseControl
    @change="delta = $event"
    @start="console.log('Started change')"
    @end="console.log('Finished change')"
  >
    <div>
      {{ delta }}
    </div>
  </MouseControl>
</template>
```

It will automatically lock the pointer to the element, making sure all mouse movements are registered for the value changes emitted by the control.

## Example

<script setup>
import { ref } from 'vue'
import { MouseControl } from '../../src'

const delta = ref('')
</script>

<MouseControl
  @change="delta = Math.round($event*10)/10"
  @start="console.log('Started change')"
  @end="console.log('Finished change')"
>
  <div
    :style="{
      height: '64px',
      width: '64px',
      borderRadius: '10%',
      border: fine ? '1px solid green' :  '1px solid blue',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all .25s ease',
      pointer: 'cursor',
    }"
  >
    <span>{{ delta }}</span>
  </div>
</MouseControl>

## Props

The following props are available for the `<Knob />` component:

| Prop             | Type                   | Default  | Optional | Note                                                                      |
| ---------------- | ---------------------- | -------- | -------- | ------------------------------------------------------------------------- |
| `normalStrength` | `number`               | `0`      | Yes      | Configures the normal strength of mouse movement effect on value          |
| `fineStrength`   | `number`               | `0`      | Yes      | Configures the fine adjustment strength of mouse movement effect on value |
| `fineKey`        | `string`               | `Alt`    | Yes      | Sets the key used for enabling fine adjustment                            |
| `captureMouse`   | `boolean`              | `true`   | Yes      | Enables mouse capture when adjusting                                      |
| `behaviour`      | `'Flat' \| 'Velocity'` | `'Flat'` | Yes      | Configures the mode of value adjustments                                  |
| `friction`       | `number`               | `0.5`    | Yes      | Sets the friction used when using the `Velocity` mode                     |

## Events

The following events are available for the `<Knob />` component:

| Prop      | Type     | Note                                   |
| --------- | -------- | -------------------------------------- |
| `@change` | `number` | Emitted on any change in mouse input   |
| `@start`  | `void`   | Emitted when the user starts adjusting |
| `@end`    | `void`   | Emitted when the user ends adjusting   |

## Advanced Usage

The component comes with a couple of features that are all adjustable:

### Mouse capture

By default, the control will capture the mouse pointer to prevent it leaving the position while adjusting.
This can be turned off using the `capture-mouse` prop:

```vue
<template>
  <MouseControl :capture-mouse="false">
    <div />
  </MouseControl>
</template>
```

Example:

<MouseControl
  :capture-mouse="false"
  @change="delta = Math.round($event*10)/10"
  @end="delta = ''"
>
  <div
    :style="{
      height: '64px',
      width: '64px',
      borderRadius: '10%',
      border: fine ? '1px solid green' :  '1px solid blue',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all .25s ease',
      pointer: 'cursor',
    }"
  >
    <span>{{ delta }}</span>
  </div>
</MouseControl>

### Fine Adjustment

To enable finer input control, the control will by default scale down the intensity of change when the `Alt` key is held down. The current state is exposed through slot scoped props, as `fine`.
Both the key and the intensity can be configured:

```vue
<template>
  <MouseControl
    v-slot="{ fine }"
    :normal-strength="10"
    :fine-strength="0.1"
    fine-key="Control"
  >
    <div :class="[fine ? 'fine' : '']" />
  </MouseControl>
</template>
```

Example:

<MouseControl
  :normal-strength="10"
  :fine-strength="0.1"
  fine-key="Control"
  @change="delta = Math.round($event*10)/10"
  @end="delta = ''"
  v-slot="{ fine }"
>
  <div
    :style="{
      height: '64px',
      width: '64px',
      borderRadius: '10%',
      border: fine ? '1px solid green' :  '1px solid blue',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all .25s ease',
      pointer: 'cursor',
    }"
  >
    <span>{{ delta }}</span>
  </div>
</MouseControl>

### Mouse mode

The control supports two different kinds of mouse adjustment modes:

1. **Flat**: This is the default, and changes the value with as much as the mouse moves
1. **Velocity**: An alternative move where instead the velocity of the mouse is being considered

This can be configured through the `mode` prop:

```vue
<template>
  <MouseControl
    mode="Velocity"
  >
    <div />
  </MouseControl>
</template>
```

Example:

<MouseControl
  mode="Velocity"
  @change="delta = Math.round($event*10)/10"
  @end="delta = ''"
  v-slot="{ fine }"
>
  <div
    :style="{
      height: '64px',
      width: '64px',
      borderRadius: '10%',
      border: fine ? '1px solid green' :  '1px solid blue',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all .25s ease',
      pointer: 'cursor',
    }"
  >
    <span>{{ delta }}</span>
  </div>
</MouseControl>
