import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

import {orderByOrder, orderField} from './fields'

export default defineType({
  name: 'smallGroup',
  title: 'Small Group',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'string',
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    orderField,
  ],
  orderings: [orderByOrder],
  preview: {
    select: {title: 'title', subtitle: 'time'},
  },
})
