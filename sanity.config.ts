// ./sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { ScanEye } from 'lucide-react'
import {media} from 'sanity-plugin-media'
import { schema } from './src/sanity/schemaTypes'
import {visionTool} from '@sanity/vision'
import {imageAssetPickerPlugin} from 'sanity-plugin-image-asset-picker'
import {userSelect} from 'sanity-plugin-user-select-input'
import { singletonTools } from 'sanity-plugin-singleton-tools'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
// import {tags} from 'sanity-plugin-tags'
import {linkField} from 'sanity-plugin-link-field'

 
// Temporary fix for the missing type definition
// See https://github.com/plsrd/sanity-plugin-singleton-tools/issues/10
declare module 'sanity-plugin-singleton-tools' {
  export interface SingletonPluginOptions {
    singleton?: boolean
  }
}

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  name: 'love-hangover',
  title: 'Love Hangover',
  subtitle: 'consent studio',
  icon: ScanEye,
  plugins: [
    structureTool(), 
    media(),
    visionTool(),
    imageAssetPickerPlugin(),
    userSelect(),
    singletonTools(),
    //  TODO: Temporary workaround for simplerColorInput visual editing issue – see https://github.com/cositehq/sanity-plugin-simpler-color-input/issues/11
    simplerColorInput(),
    //  TODO: Resolve tag plugin issue
    // tags()
    linkField()
    ],
  schema,
});
