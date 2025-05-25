import { defineArrayMember, defineField, defineType } from 'sanity'
// import { imageBlock } from '../definitions'
import { getBlockText } from 'sanitypress-utils'

export const richText = defineType({
	name: 'richText',
	title: 'Rich Text',
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'options', title: 'Options' },
	],
	fields: [
		// defineField({
		// 	name: 'options',
		// 	title: 'Module options',
		// 	type: 'module-options',
		// 	group: 'options',
		// }),
		defineField({
			name: 'content',
			type: 'array',
			of: [
				{ type: 'block' },
				// defineArrayMember({
				// 	title: 'Code block',
				// 	type: 'code',
				// 	options: {
				// 		withFilename: true,
				// 	},
				// }),
				// { type: 'custom-html' },
			],
			group: 'content',
		}),
		defineField({
			name: 'tableOfContents',
			type: 'boolean',
			initialValue: false,
			group: 'options',
		}),
		defineField({
			name: 'tocPosition',
			type: 'string',
			options: {
				list: ['left', 'right'],
				layout: 'radio',
			},
			hidden: ({ parent }) => !parent.tableOfContents,
			initialValue: 'right',
			group: 'options',
		}),
		defineField({
			name: 'stretch',
			type: 'boolean',
			initialValue: false,
			hidden: ({ parent }) => parent.tableOfContents,
			group: 'options',
		}),
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'Richtext module',
		}),
	},
})