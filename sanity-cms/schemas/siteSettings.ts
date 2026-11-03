import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'homepage', title: 'Homepage', default: true},
    {name: 'contact', title: 'Footer & Contact'},
    {name: 'giving', title: 'Giving'},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'homepage',
      description:
        'The big line on the homepage photo. Leave empty for "Welcome to Winona Gospel Church".',
      validation: (rule) => rule.max(50).warning(`Heading shouldn't be more than 50 characters.`),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'homepage',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'serviceHeading',
      title: 'Service Heading',
      type: 'string',
      group: 'homepage',
      description: 'e.g. "Regular Service"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'serviceTime',
      title: 'Service Time',
      type: 'string',
      group: 'homepage',
      description: 'e.g. "Sunday - 10:00 am"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'youtubeLink',
      title: 'YouTube Link',
      type: 'url',
      group: 'homepage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'podcastLink',
      title: 'Podcast Link',
      type: 'url',
      group: 'homepage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addressLink',
      title: 'Address Link',
      type: 'url',
      group: 'homepage',
      description: 'A Google Maps link to the church.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'footerContactPhone',
      title: 'Contact Phone (Footer)',
      type: 'string',
      group: 'contact',
      description: '10 digits, no spaces or dashes, e.g. 9055551234',
      // the footer formats exactly 10 digits and shows nothing otherwise
      validation: (rule) =>
        rule
          .regex(/^\d{10}$/, {name: '10 digits'})
          .error('Use 10 digits with no spaces or dashes.'),
    }),
    defineField({
      name: 'footerContactEmail',
      title: 'Contact Email (Footer)',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'officeHoursLine1',
      title: 'Office Hours Line 1 (Footer)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'officeHoursLine2',
      title: 'Office Hours Line 2 (Footer)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'newsletterSignupFormLink',
      title: 'Newsletter Sign-Up Form Link',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'etransferEmail',
      title: 'E-Transfer Email',
      type: 'string',
      group: 'giving',
      validation: (rule) => rule.email(),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
