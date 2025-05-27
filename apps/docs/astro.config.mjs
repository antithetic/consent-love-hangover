// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'Consent Docs',
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/antithetic' }],
        sidebar: [
            {
                label: 'Guides',
                items: [
                    // Each item here is one entry in the navigation menu.
                    { label: 'Example Guide', slug: 'guides/example' },
                ],
            },
            {
                label: 'Reference',
                autogenerate: { directory: 'reference' },
            },
        ],
		}), 
		react(), 
		markdoc(),
		keystatic()],
});