import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index.mjs',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        intro: 'import "./style.css"',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
