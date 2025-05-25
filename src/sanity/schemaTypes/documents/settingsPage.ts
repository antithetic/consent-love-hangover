import { Settings } from "lucide-react";
import { EarthGlobeIcon, ComposeSparklesIcon } from '@sanity/icons'
import { defineField, defineType } from "sanity";

export const settingsPage = defineType({ 
    name: 'settings',
    title: 'Site Settings',
    type: 'document',
    icon: Settings,
    options: {
        singleton: true,
    },
    groups: [ 
        {
            default: true,
            name: 'meta',
            title: 'Meta',
            icon: EarthGlobeIcon,
        },
        {
            name: 'style',
            title: 'Style',
            icon: ComposeSparklesIcon,
        }
    ],
    fields: [
        // General site info
        defineField({
            group: 'meta',
            name: 'title',
            title: 'Page Title',
            type:'string',
            hidden: true,

        }),
        defineField({
            group: 'meta',
            name: 'siteTitle',
            title: 'Website Title',
            type: 'string',
        }),
        defineField({
            group: 'meta',
            name:'siteSubtitle',
            title: 'Website Subtitle',
            type: 'string',
        }),
        defineField({
            group: 'meta',
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            group: 'meta',
            name: 'siteImage',
            title: 'Meta Image',
            type: 'image',
        }),
        defineField({
            group: 'meta',
            name: 'siteTags',
            title: 'Website tags',
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
            group: 'style',
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'simplerColor',
        }),
        defineField({
            group: 'style',
            name: 'textColor',
            title: 'Text Color',
            type: 'simplerColor',
        }),
        defineField({
            group: 'style',
            name: 'linkColor',
            title: 'Link Color',
            type: 'simplerColor',
        })
    ]

})