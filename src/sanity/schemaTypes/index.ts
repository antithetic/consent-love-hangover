import type { SchemaTypeDefinition } from 'sanity'
import { categoryType } from './documents/categoryType'
import { settingsPage } from './documents/settingsPage'
import { pageType } from './documents/pageType'
import { memberType } from './documents/memberType'

// objects
import { metadataType } from './objects/metadata'

// definitions
import { pageBuilder } from './definitions/pageBuilder'
import { richTextContent } from './definitions/richText'

//  Blocks

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        // Documents
        categoryType,
        pageType,
        memberType,

        // pages
        settingsPage,

        // Objects
        metadataType,

        // definitions
        pageBuilder,

        // Blocks
        richTextContent,
    ]
};
