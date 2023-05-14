import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['settings', 'youthMinistry', 'childrensMinistry'])

export default defineConfig({
  name: 'default',
  title: 'wgc-sanity-cms',

  projectId: '5vf3tw8e',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('upcomingEvent').title('Upcoming Events'),
            S.documentTypeListItem('smallGroup').title('Small Groups'),

            S.listItem()
              .title('Youth Ministry')
              .id('youthMinistry')
              .child(S.document().schemaType('youthMinistry').documentId('youthMinistry')),

            S.listItem()
              .title("Children's Ministry")
              .id('childrensMinistry')
              .child(S.document().schemaType('childrensMinistry').documentId('childrensMinistry')),

            S.documentTypeListItem('teamMember').title('Team Members'),
            // S.documentTypeListItem('mission').title('Missions'),
            S.documentTypeListItem('faithArticle').title('Articles of Faith'),
            S.documentTypeListItem('churchValue').title('Church Values'),

            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,

    // Filter out singleton types from the global “New document” menu options
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
