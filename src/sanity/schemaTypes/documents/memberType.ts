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
            name: 'name',
            title: 'Name',
            type: 'string',
            group: 'info'
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          group: 'info',
        }),
        defineField({
            name: 'bio',
            title: 'Member Bio',
            type: 'array',
            group: 'info',
            of: [
                {
                  type: 'block',
                  styles: [],
                  lists: [],                  
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                      { title: 'Underline', value: 'underline' },
                      { title: 'Strike', value: 'strike-through' }
                    ],
                    annotations: [
                      {
                        name: 'link',
                        title: 'Link',
                        type: 'link',
                        options: {
                          enableText: true
                        }
                      }
                    ]
                  }
                },
                
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
              description: 'Important for SEO and accesibility.',
              validation: (Rule) => Rule.required().error('Alt text is required'),
              hidden: ({ parent }) => !parent?.asset?._ref,
            })
          ]
        }),
        // Pronouns
        // pronouns
    defineField({
      name: 'pronouns',
      title: 'Pronouns',
      group: 'info',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'He/Him', value: 'he-him'},
                  {title: 'She/Her', value: 'she-her'},
                  {title: 'They/Them', value: 'they-them'},
                  {title: 'Custom', value: 'custom'},
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required().error('Please select a pronoun type'),
            },
            {
              name: 'custom',
              title: 'Custom Pronouns',
              type: 'string',
              description: 'Enter custom pronouns',
              hidden: ({parent}) => parent?.type !== 'custom',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as {type?: string}
                  if (parent?.type === 'custom' && !value) {
                    return 'Please enter custom pronouns'
                  }
                  return true
                }),
            },
          ],
          preview: {
            select: {
              type: 'type',
              custom: 'custom',
            },
            prepare({type, custom}) {
              // Define the type for our pronounMap
              const pronounMap: Record<string, string> = {
                'he-him': 'He/Him',
                'she-her': 'She/Her',
                'they-them': 'They/Them',
                custom: custom || 'Custom',
              }

              // Use type checking to ensure the key exists
              const title = type && pronounMap[type] ? pronounMap[type] : 'Unspecified'

              return {
                title,
                media: CircleSmall,
              }
            },
          },
        },
      ],
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
          group: 'info',
        }),
        //  Social links
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
        }),
        // Additional Media
        defineField({
          name: 'photos',
          title: 'Additional images',
          description: 'Upload up to 5 additional images.',
          group: 'media',
          type: 'array',
          of: [{type: 'image'}],
          validation: (Rule) =>
            Rule.min(1).max(5).error('You must upload between 1 and 5 works'),
        })
    ]
})