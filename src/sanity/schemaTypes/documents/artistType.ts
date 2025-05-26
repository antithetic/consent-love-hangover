import { defineField, defineType } from 'sanity';
import {UserIcon} from '@sanity/icons'

export const artistType = defineType({
    name: 'artist',
    title: 'Artist',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Artist Name',
            type: 'string',
        }),
        // Replace "slug" in the array of fields:
defineField({
    name: 'slug',
    type: 'slug',
    title: 'Profile Path',
    options: {source: 'name'},
    validation: (rule) => rule.required().error(`Required to generate a page on the website`),
    hidden: ({document}) => !document?.name,
  }),
        
        defineField({
            name: 'pronouns',
            title: 'Artist Pronouns',
            type: 'string'
        }),
        defineField({
            name: 'bio',
            title: 'Artist Bio',
            type: 'text',
            rows: 2
        }),
        defineField({
            name: 'photo',
            title: 'Artist Photo',
            description: 'Upload a portrait photo of the artist',
            type: 'image',
        }),
        defineField({
            name: 'artistTags',
            title: 'Artist Tags',
            type: 'string',
        })
    ]
})