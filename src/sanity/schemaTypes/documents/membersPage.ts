import { defineField, defineType } from 'sanity'

export const membersPage = defineType({
    name: 'membersPage',
    title: 'Members',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            hidden: true,
            initialValue: 'Members'
        }),
        defineField({
            name: 'members',
            title: 'Collective Members',
            type: 'array',
            of: [{type: 'member'}]
        })
    ]
})