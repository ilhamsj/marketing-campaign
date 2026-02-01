import type { CollectionConfig } from 'payload'

export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    preview: (data) => `/templates/${data.id}`,
    livePreview: { url: ({ data }) => `/templates/${data.id}` },
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'html',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
      },
    },
    {
      name: 'css',
      type: 'code',
      admin: {
        language: 'css',
      },
    },
  ],
}
