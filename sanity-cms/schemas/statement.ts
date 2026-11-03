import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

import {orderByOrder, orderField} from './fields'

export default defineType({
  name: 'statement',
  title: 'Statement',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Where the statement is published.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    orderField,
  ],
  orderings: [orderByOrder],
  preview: {
    select: {title: 'title', subtitle: 'link'},
  },
})
