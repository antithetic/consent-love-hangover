import type { SchemaTypeDefinition } from 'sanity'
import { categoryType } from './documents/categoryType'
import { settingsPage } from './documents/settingsPage'
import { pageType } from './documents/pageType'

// objects
import { metadataType } from './objects/metadataType'

//  Blocks
import { richText

 } from './blocks/richtext'
export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        // Documents
        categoryType,
        pageType,

        // pages
        settingsPage,

        // Objects
        metadataType,

        // Blocks
        richText,

    ]
  };