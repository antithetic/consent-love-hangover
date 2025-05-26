import { defineField, defineType} from 'sanity'

export const pronounsType = defineType({
    name: 'pronouns',
    type: 'object',
    fields: [
        defineField({
            name: 'userPronouns',
            type: 'string',
        })
    ]
})