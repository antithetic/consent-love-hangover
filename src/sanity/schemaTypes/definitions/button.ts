import { defineType, defineField } from "sanity";

export const button = defineType({
  name: "button",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      validation: Rule => Rule.required().min(1).max(50)
    }),
    defineField({
      name: "url",
      type: "url",
      title: "URL",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "openInNewTab",
      type: "boolean",
      title: "Open in new tab",
      initialValue: false
    }),
    // add other button-specific fields here
  ],
});