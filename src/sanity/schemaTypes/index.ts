import type { SchemaTypeDefinition } from 'sanity'
import { categoryType } from './documents/categoryType'
 
export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        categoryType,
    ],
  };