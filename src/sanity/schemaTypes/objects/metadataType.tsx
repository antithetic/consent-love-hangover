import { defineField, defineType } from 'sanity'

export const metadataType = defineType({
    name: 'metadata',
    title: 'Metadata',
    description: 'For search engines',
    type: 'object',
    fields: [
        defineField({
            name: 'slug',
            title: 'Slug',
            description: 'Website path or permalink',
            type: 'slug',
            validation: (Rule) => Rule.required(),
        })
    ]
})