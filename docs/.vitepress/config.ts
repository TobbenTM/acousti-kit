import { defineConfig } from 'vitepress'
import svgLoader from 'vite-svg-loader'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'acousti-kit',
  description: 'Collection of production grade Vue.js audio interface components',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting started', link: '/getting-started' },
      { text: 'Components', link: '/components/knob' },
    ],

    sidebar: [
      {
        text: 'The basics',
        items: [
          { text: 'Getting started', link: '/getting-started' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'Knob', link: '/components/knob' },
          { text: 'MouseControl', link: '/components/mouse-control' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tobbentm/acousti-kit' },
    ],
  },

  vite: {
    plugins: [svgLoader()],
  },

  cleanUrls: true,
})
