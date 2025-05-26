import { defineType, defineField } from 'sanity'
import { UserIcon, InfoOutlineIcon, LinkIcon, EyeOpenIcon } from '@sanity/icons'

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
          name: 'name',
          title: 'Name',
          description: 'Name to be discplayed on member profile.',
          type: 'string',
          group: 'info'
        }),
        defineField({
          name: 'slug',
          title: 'Profile Path',
          description: 'Website path or permalink',
          group: 'info',
          type: 'slug',
          options: {
              source: 'name'
          },
          validation: (Rule) => Rule.required(),
      }),
        defineField({
          name: 'headline',
          title: 'Profile Headline',
          description: 'Quote or headline to be displayed on profile.',
          group: 'info',
          type: 'string',
        }),
        defineField({
          name: 'bio',
          title: 'Member Bio',
          type: 'array',
          group: 'info',
          of: [
            {
              type: 'block',
              styles: [], // Remove all styles including blockquote
              lists: [], // Remove all list types (bullet, number, etc.)
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                  { title: 'Underline', value: 'underline' }
                ],
                annotations: [] // Remove all annotations including links
              }
            }
          ]
        }),
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
          description: 'User associated with this member profile.',
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