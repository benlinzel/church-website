import {CogIcon} from '@sanity/icons/Cog'
import {UsersIcon} from '@sanity/icons/Users'
import type {SortOrderingItem} from 'sanity'
import type {StructureResolver} from 'sanity/structure'

// Singletons: one fixed document each, opened directly instead of as a list.
export const singletonTypes = new Set(['siteSettings', 'youthMinistry', 'childrensMinistry'])

const byOrder: SortOrderingItem[] = [{field: 'order', direction: 'asc'}]

export const structure: StructureResolver = (S) => {
  const singleton = (type: string, title: string, icon = UsersIcon) =>
    S.listItem()
      .title(title)
      .id(type)
      .icon(icon)
      .child(S.document().schemaType(type).documentId(type).title(title))

  // lists open in the order the site shows them
  const list = (type: string, title: string, ordering = byOrder) =>
    S.documentTypeListItem(type)
      .title(title)
      .child(S.documentTypeList(type).title(title).defaultOrdering(ordering))

  return S.list()
    .title('Content')
    .items([
      list('upcomingEvent', 'Upcoming Events', [{field: 'date', direction: 'desc'}]),
      list('smallGroup', 'Small Groups'),
      singleton('youthMinistry', 'Youth Ministry'),
      singleton('childrensMinistry', "Children's Ministry"),
      list('teamMember', 'Team Members'),
      list('faithArticle', 'Articles of Faith'),
      list('statement', 'Statements We Support'),
      S.divider(),
      singleton('siteSettings', 'Site Settings', CogIcon),
    ])
}
