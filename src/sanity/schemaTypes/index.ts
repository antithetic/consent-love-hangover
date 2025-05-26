import type { SchemaTypeDefinition } from 'sanity'
import { categoryType } from './documents/categoryType'
import { settingsPage } from './documents/settingsPage'
import { pageType } from './documents/pageType'

// objects
import { metadataType } from './objects/metadata'

// definitions
import { pageBuilder } from './definitions/pageBuilder'
import { richTextContent } from './definitions/richText'

//  Blocks
import { richText } from './blocks/richText'


export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        // Documents
        categoryType,
        pageType,

        // pages
        settingsPage,

        // Objects
        metadataType,

        // definitions
        pageBuilder,

        // Blocks
        richText,
        richTextContent,
    ]
};
