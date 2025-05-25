import { StickyNote } from 'lucide-react'
import { defineField, defineType } from 'sanity'
import { GROUP, GROUPS } from '../../utils/const'
import { pageBuilderField } from '../common'

export const pageType = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    description: 
        'Create a new page for your website, like an "About Us" or "Contact" page. Each page has its own web address and content that you can customize',
    groups: GROUPS,
    icon: StickyNote,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 
                'The main heading that appears at the top of your page and in browser tabs',
            group: GROUP.CONTENT,
            validation: (Rule) => Rule.required(),
        }),
        pageBuilderField,
        defineField({
            name: 'metadata',
            title: 'Metadata',
            type: 'metadata',
            group: GROUP.META
        })
    ],
    preview: {
        select: {
            title: 'title'
        }
    }
})
