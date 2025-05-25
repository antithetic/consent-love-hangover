import type { SchemaTypeDefinition } from 'sanity'
import { categoryType } from './documents/categoryType'
import { settingsPage } from './documents/settingsPage';
 
export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        categoryType,

        // pages
        settingsPage,
    ],
  };