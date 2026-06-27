import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://alesso-24.github.io',
  base: '/portfolio',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
})
