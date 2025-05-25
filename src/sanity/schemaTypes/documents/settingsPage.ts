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
        defineField({
            name: 'title',
            title: 'Site Title',
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
            name: 'seo',
            title: 'SEO',
            type: 'seoMetaFields'
        })
    ]

})