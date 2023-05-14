import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'churchValue',
  title: 'Church Value',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})
