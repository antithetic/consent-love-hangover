import { defineField, defineType } from 'sanity'

export const metadataType = defineType({
    name: 'metadata',
    title: 'Metadata',
    description: 'For search engines',
    type: 'object',
    fields: [
        defineField({
            name: 'noIndex',
            description: 'Prevent search engines from indexing this page',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            description: 'Website path or permalink',
            type: 'slug',
            options: {
                source: (doc: any) => doc.title || doc.metadata.title,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            description: 
                'A brief summary of what this page is about. This text helps search engines understand your page and may appear in search results.',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.max(160).warning(),
        }),
        defineField({
            name: 'image',
            title: 'SEO Image',
            description: 'A main picture for this page that can be used when sharing on social media or in search results',
            type: 'image',
            options: {
                hotspot: true,
                metadata: ['lqip'],
            }
        }),
    ]
})