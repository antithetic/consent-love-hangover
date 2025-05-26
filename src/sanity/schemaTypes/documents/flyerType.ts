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
        name: "Title",
        title: "Title",
        validation: (e) => e.required(),
      }),
      defineField({
        type: "date",
        name: "EventDate",
        title: "Event Date",
        validation: (e) => e.required(),
      }),
      defineField({
        type: "text",
        name: "Description",
        title: "Description",
        rows: 3,
      }),
      defineField({
        type: "string",
        name: "Tags",
        title: "Tags",
      })
    ],
  });