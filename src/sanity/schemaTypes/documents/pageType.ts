import { StickyNote } from 'lucide-react'
import {EarthGlobeIcon} from '@sanity/icons'
import {BlockElementIcon} from '@sanity/icons'
import { defineField, defineType } from "sanity";

export const pageType = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    description: 
        'Create a new page for your website, like an "About Us" or "Contact" page. Each page has its own web address and content that you can customize',

    icon: StickyNote,
    groups: [
        { 
            default: true,
            name: 'content',
            icon: BlockElementIcon
        }, 
        { 
            name: 'metadata',
            icon: EarthGlobeIcon
        }
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 
                'The main heading that appears at the top of your page and in browser tabs',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'metadata',
            title: 'Metadata',
            type: 'metadata',
            group: 'metadata'
        })
    ],
    preview: {
        select: {
            title: 'title'
        }
    }
})
