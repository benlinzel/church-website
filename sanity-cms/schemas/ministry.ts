import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

// The youth and children's ministry pages share one shape; each is a
// singleton (see structure.ts).
const ministry = (name: string, title: string) =>
  defineType({
    name,
    title,
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
        name: 'subtitle',
        title: 'Subtitle',
        type: 'string',
      }),
      defineField({
        name: 'featuredImage',
        title: 'Featured Image',
        type: 'image',
        description: "Not shown on the site's ministry page yet.",
        options: {hotspot: true},
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'blockContent',
      }),
    ],
    preview: {
      prepare: () => ({title}),
    },
  })

export const youthMinistry = ministry('youthMinistry', 'Youth Ministry')
export const childrensMinistry = ministry('childrensMinistry', "Children's Ministry")
