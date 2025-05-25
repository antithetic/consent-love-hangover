// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: '6ziojjbn',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2025-05-24',
      studioBasePath: '/studio'
    }), 
    react()
  ]
});