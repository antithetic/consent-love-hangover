import { defineType, defineField } from "sanity";

export const button = defineType({
  name: "button",
  title: "Button",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label" }),
    defineField({ name: "url", type: "url",    title: "URL" }),
    // add other button-specific fields here
  ],
});