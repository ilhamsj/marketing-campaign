import type { CollectionConfig } from 'payload'

export const Workflows: CollectionConfig = {
  slug: 'workflows',
  admin: {
    useAsTitle: 'name',
    preview: ({ id }) => `/workflow/${id}`,
    livePreview: {
      url: ({ data }) => `/workflow/${data.id}`,
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'nodes',
      type: 'json',
    },
    {
      name: 'edges',
      type: 'json',
    },
  ],
}
