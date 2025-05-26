import { defineType, defineField } from 'sanity'
import { UserIcon, InfoOutlineIcon, LinkIcon } from '@sanity/icons'

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
          type: 'link',
          group: 'links'
        }),
        defineField({
          name: 'socialLinks',
          title: 'Social Links',
          type: 'link',
          group: 'links'
        })
    ]
})