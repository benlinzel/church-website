import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'upcomingEvent',
  title: 'Upcoming Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
  ],
  orderings: [
    {
      title: 'Date',
      name: 'date',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
})
