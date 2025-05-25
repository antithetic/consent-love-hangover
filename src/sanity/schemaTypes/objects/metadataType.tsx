import { defineField, defineType } from 'sanity'

export const metadataType = defineType({
    name: 'metadata',
    title: 'Metadata',
    description: 'For search engines',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            description: 'Website path or permalink',
            type: 'slug',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(160).warning(),
        }),
        defineField({
            name: 'image',
            title: 'SEO Image',
            description: 'Used for social sharing previews',
            type: 'image',
            options: {
                hotspot: true,
                metadata: ['lqip'],
            }
        }),
        defineField({
            name: 'noIndex',
            description: 'Prevent search engines from indexing this page',
            type: 'boolean',
            initialValue: false
        })
    ]
})