import {defineField} from 'sanity'

// Shared by every list the site sorts by hand (team, small groups, faith
// articles, statements).
export const orderField = defineField({
  name: 'order',
  title: 'Order',
  type: 'number',
  description: 'Lower numbers show first on the site.',
  validation: (rule) => rule.integer().min(0),
})

export const orderByOrder = {
  title: 'Order',
  name: 'order',
  by: [{field: 'order', direction: 'asc' as const}],
}
