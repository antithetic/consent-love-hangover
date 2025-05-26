import { defineType, defineField } from 'sanity'
import { UserIcon, InfoOutlineIcon, LinkIcon, EyeOpenIcon } from '@sanity/icons'
import { CircleSmall } from 'lucide-react'

export const memberType = defineType({
    name: 'member',
    title: 'Member',
    type: 'document',
    icon: UserIcon,
    groups: [
        {
            default: true,
            name: 'info',
            title: 'Member Info',
            icon: InfoOutlineIcon
        },
        {
            name: 'links',
            title: 'Social Links',
            icon: LinkIcon
        },
        {
          name: 'media',
          title: 'Media',
          icon: EyeOpenIcon
        }
    ],
    fields: [
        defineField({
          name: 'profilePicture',
          title: 'Profile Picture',
          description: 'Upload a picture to be shown alongside your profile.',
          type: 'image',
          group: 'info',
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility.',
              validation: (Rule) => Rule.required().error('Alt text is required'),
              hidden: ({ parent }) => !parent?.asset?._ref
            })
          ]
        }),
        defineField({
            name: 'email',
            title: 'Contact Email',
            type: 'email',
            group: 'info'
        }),
        defineField({
          name: 'userId',
          title: 'Project User',
          type: 'userSelect',
          group: 'info'
        }),
        defineField({
          name: 'website',
          title: 'Website',
          description: 'Link to primary website.',
          type: 'url',
          group: 'links'
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram Handle',
          description: 'Provide instagram handle like so "username".',
          type: 'string',
          group: 'links'
        }),
        defineField({
          name: 'photos',
          title: 'Additional images',
          description: 'Upload up to 5 additional images.',
          group: 'media',
          type: 'array',
          of: [{type: 'image'}],
          validation: (Rule) =>
            Rule.min(1).max(5).error('You must upload between 1 and 5 images.')
        })
    ]
})