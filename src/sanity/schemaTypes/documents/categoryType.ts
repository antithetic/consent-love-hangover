// ./src/sanity/schemaTypes/documents/categoryType.ts
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the category",
      validation: (Rule) => Rule.required().min(1).max(500),
    }),
  ],
});