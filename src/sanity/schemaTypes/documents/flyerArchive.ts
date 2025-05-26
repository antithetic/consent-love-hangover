import { defineField, defineType } from 'sanity'
import {ImagesIcon} from '@sanity/icons'


  
  
  export const flyerArchive = defineType({
    type: "document",
    name: "flyerArchive",
    title: "Flyer Archive",
    icon: ImagesIcon,
    fields: [
      defineField({
        type: "string",
        name: "title",
        title: "Title",
        validation: (e) => e.required(),
      }),
// 🌟 Update the import to pull in `defineArrayMember`
import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'flyerArchive',
  title: 'Flyer Archive',
  type: 'document',
  fields: [
    // … other fields …

    // 🌟 Re-enable and fix the Flyers array field
    defineField({
      type: "array",
      name: "flyers",            // camelCase name
      title: "Flyers",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "flyer" }] // use the correct document type
        }),
      ],
    }),

    // … other fields …
  ],
})
    ],
  });
  
  
  