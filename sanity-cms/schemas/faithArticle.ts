import {BookIcon} from '@sanity/icons/Book'
import {defineField, defineType} from 'sanity'

import {orderByOrder, orderField} from './fields'

export default defineType({
  name: 'faithArticle',
  title: 'Article of Faith',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
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
    select: {title: 'title', order: 'order'},
    prepare: ({title, order}) => ({title, subtitle: order != null ? `#${order}` : undefined}),
  },
})
