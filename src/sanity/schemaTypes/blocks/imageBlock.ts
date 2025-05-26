import { defineArrayMember, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const imageBlock = defineArrayMember({
	name: 'imageBlock',
	type: 'image',
  icon: ImageIcon,
  description: 'Image Block',
  options: {
    hotspot: true,
    metadata: ['lqip'],
  },
  fieldsets: [
    { name: 'attributes', options: { columns: 2 } },
    { name: 'options' },
  ],
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      fieldset: 'attributes',
    }),
    defineField({
      name: 'loading',
      type: 'string',
      options: {
        list: ['lazy', 'eager'],
        layout: 'radio',
      },
      initialValue: 'lazy',
      fieldset: 'attributes',
    }),
    defineField({
      name: 'caption',
      type: 'text',
      rows: 2,
      fieldset: 'options',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      description: 'Link to internal/external source',
      type: 'link',
      fieldset: 'options',
      options: {
        enableText: true
      }
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'asset',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Untitled Image',
        subtitle: 'Image Block',
        media: media,
      }
    },
  },
})