import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: "postcss.config.js",
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
})
