import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  base: '/interactive-shopify-theme-dev-roadmap/',
  plugins: [svelte()],
})
