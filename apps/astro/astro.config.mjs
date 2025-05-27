// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import showTailwindcssBreakpoint from 'astro-show-tailwindcss-breakpoint';

import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  integrations: [
    react(), 
    showTailwindcssBreakpoint(),
    
    
    // It is important that this is the last integration in the integrations property to ensure all the generated files are compressed.
    compressor()]
});