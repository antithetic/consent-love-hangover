// ./sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  name: 'love-hangover',
  title: 'Love Hangover',
  subtitle: 'consent studio',
  plugins: [structureTool()],
  schema: {
    types: [],
  },
});
