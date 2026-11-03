import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

import {orderByOrder, orderField} from './fields'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      // the Our Team page skips anyone without a name and title
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Their role, e.g. "Senior Pastor"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      description: 'Square photos work best. Initials show if this is empty.',
      options: {hotspot: true},
    }),
    orderField,
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
    }),
  ],
  orderings: [orderByOrder],
  preview: {
    select: {title: 'name', subtitle: 'title', media: 'headshot'},
  },
})
