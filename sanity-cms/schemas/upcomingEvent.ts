import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'upcomingEvent',
  title: 'Upcoming Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'The homepage shows events from today onwards.',
      validation: (rule) => rule.required(),
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
  preview: {
    select: {title: 'title', date: 'date'},
    prepare: ({title, date}) => ({
      title,
      // dates are stored as YYYY-MM-DD; read them as UTC so they don't shift a day
      subtitle: date
        ? new Date(date).toLocaleDateString('en-CA', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
          })
        : 'No date',
    }),
  },
})
