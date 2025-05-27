// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import showTailwindcssBreakpoint from 'astro-show-tailwindcss-breakpoint';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  integrations: [react(), showTailwindcssBreakpoint()]
});