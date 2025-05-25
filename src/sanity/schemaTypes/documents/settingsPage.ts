import { Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export const settingsPage = defineType({ 
    name: 'settings',
    title: 'Site Settings',
    type: 'document',
    icon: Settings,
    options: {
        singleton: true,
    },
    fields: [
        // General site info
        defineField({
            name: 'title',
            title: 'Page Title',
            type:'string',

        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'siteImage',
            title: 'Meta Image',
            type: 'image',
        }),
        defineField({
            name: 'siteTags',
            title: 'Site tags',
            type: 'array',
            of: [{
                type: 'string'
            }],
            options: {
                layout: 'tags',
            },
            validation: Rule => Rule.unique(),
        }),
        // Site Styles
        defineField({
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'simplerColor',
        })    
    ]

})