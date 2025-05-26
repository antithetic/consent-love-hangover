import { defineField, defineType } from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const flyerType = defineType({
    type: "document",
    name: "flyer",
    title: "Flyer",
    icon: ImageIcon,
    fields: [
        defineField({
            type: "image",
            name: "image",
            title: "Flyer Image",
            validation: (e) => e.required(),
          }),
      defineField({
        type: "string",
        name: "title",
        title: "Title",
        validation: (e) => e.required(),
      }),
      defineField({
        type: "date",
        name: "eventDate",
        title: "Event Date",
        validation: (e) => e.required(),
      }),
      defineField({
        type: "text",
        name: "description",
        title: "Description",
        rows: 3,
      }),
      defineField({
        name: 'artists',
        title: 'Artists',
        type: 'reference',
        to: [{type: 'artist'}],
      }),
      defineField({
        type: "string",
        name: "tags",
        title: "Tags",
      })
    ],
  });