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
      // defineField({
      //   type: "array",
      //   name: "Flyers",
      //   title: "Flyers",
      //   of: [
      //     defineArrayMember({ type: "reference", to: [{ type: "flyerType" }] }),
      //   ],
      // }),
    ],
  });
  
  
  