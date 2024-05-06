---
outline: deep
---

# Getting started

All the components of this package are ready to go, headless by design, with simple fallback implementations for testing early.

## 📦 Install

Start by installing using your favourite package manager:

```bash
yarn add acousti-kit
```

## 🔧 Use

Then use components where necessary by importing them:

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

Read more about the components available through the menu.
