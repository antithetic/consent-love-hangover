export const definitions = [];import { defineArrayMember, defineField } from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const imageBlock = defineArrayMember({
	type: 'image',
	icon: ImageIcon,
	options: {
		hotspot: true,
		metadata: ['lqip'],
	},
	fieldsets: [
		{ name: 'attributes', options: { columns: 2 } },
		{ name: 'options' },
	],
	fields: [
		defineField({
			name: 'alt',
			type: 'string',
			fieldset: 'attributes',
		}),
		defineField({
			name: 'loading',
			type: 'string',
			options: {
				list: ['lazy', 'eager'],
				layout: 'radio',
			},
			initialValue: 'lazy',
			fieldset: 'attributes',
		}),
		defineField({
			name: 'caption',
			type: 'text',
			rows: 2,
			fieldset: 'options',
		}),
		defineField({
			name: 'source',
			title: 'Source',
			description: 'Link to internal/external source',
			type: 'link',
			fieldset: 'options',
			options: {
				enableText: true
			}
		}),
	],
	preview: {
		select: {
			title: 'caption',
			subtitle: 'alt',
			media: 'asset',
		},
	},
})