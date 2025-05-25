// @ts-check
import { defineConfig } from 'astro/config';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '6ziojjbn',
      dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
      useCdn: false,
      apiVersion: '2025-05-24',
      studioBasePath: '/studio'
    }),
    react()
  ],

  adapter: vercel()
});