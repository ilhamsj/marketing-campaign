import type { CollectionConfig } from 'payload'

export const Campaigns: CollectionConfig = {
  slug: 'Campaigns'.toLowerCase(),
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'fromAddress',
      type: 'email',
      required: true,
    },
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'templates',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
