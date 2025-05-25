// ./sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { ScanEye } from 'lucide-react'


export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  name: 'love-hangover',
  title: 'Love Hangover',
  subtitle: 'consent studio',
  icon: ScanEye,
  plugins: [structureTool()],
  schema: {
    types: [],
  },
});
