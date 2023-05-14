import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional',
      validation: (Rule) => Rule.max(50).warning(`Heading shouldn't be more than 50 characters.`),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'serviceHeading',
      title: 'Service Heading',
      type: 'string',
    }),
    defineField({
      name: 'serviceTime',
      title: 'Service Time',
      type: 'string',
    }),
    defineField({
      name: 'youtubeLink',
      title: 'YouTube Link',
      type: 'string',
    }),
    defineField({
      name: 'podcastLink',
      title: 'Podcast Link',
      type: 'string',
    }),
    defineField({
      name: 'addressLink',
      title: 'Address Link',
      type: 'string',
    }),
    defineField({
      name: 'footerContactPhone',
      title: 'Contact Phone (Footer)',
      type: 'string',
      validation: (Rule) => Rule.max(10).warning(`Phone number should not contain any spaces or special characters`),
    }),
    defineField({
      name: 'footerContactEmail',
      title: 'Contact Email (Footer)',
      type: 'string',
    }),
    defineField({
      name: 'officeHoursLine1',
      title: 'Office Hours Line 1 (Footer)',
      type: 'string',
    }),
    defineField({
      name: 'officeHoursLine2',
      title: 'Office Hours Line 2 (Footer)',
      type: 'string',
    }),
    defineField({
      name: 'etransferEmail',
      title: 'E-Transfer Email',
      type: 'string',
    }),
  ],
})
