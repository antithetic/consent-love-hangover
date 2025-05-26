import { defineType } from 'sanity'

export const richTextContent = defineType({
  name: 'richTextContent',
  title: 'Rich Text Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' }
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL'
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Open in new tab'
              }
            ]
          }
        ]
      }
    },
    {
      type: 'image',
      options: { hotspot: true }
    }
  ]
}) 