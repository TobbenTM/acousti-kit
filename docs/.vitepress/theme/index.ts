import theme from 'vitepress/theme'
import { h } from 'vue'
import Sponsor from '../components/sponsor.vue'

export default {
  ...theme,
  Layout() {
    return h(theme.Layout, null, {
      'home-features-after': () => h(Sponsor),
    })
  },
  enhanceApp(ctx) {
    theme.enhanceApp(ctx)
  },
}
