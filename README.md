<p align="center">
acousti-kit
<br>
A collection of production grade Vue.js audio interface components
</p>

<p align="center">
Special Sponsor
<br>
<br>
<a href="https://moonbase.sh"><img src="./.github/Moonbase_Sponsor.png"></a>
</p>

## Usage

```vue
<script setup>
import { Knob, Meter, Slider } from 'acousti-kit'

const volume = ref(100)
</script>

<template>
  <main>
    <Knob v-model="volume" />
    <Slider v-model="volume" />
    <Meter :value="volume" />
  </main>
</template>
```

Refer to the [documentation](https://acousti-kit.io/) for more details.

## 📦 Install

```bash
yarn add acousti-kit
```
