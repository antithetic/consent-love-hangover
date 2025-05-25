import { StickyNote } from 'lucide-react'
import {EarthGlobeIcon} from '@sanity/icons'
import {BlockElementIcon} from '@sanity/icons'
import { defineField, defineType } from "sanity";

export const pageType = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
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
            title: 'Page Title',
            type: 'string',
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
