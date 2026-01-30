import type { CollectionConfig } from 'payload'

export const CampaignsTemplates: CollectionConfig = {
  slug: 'campaigns-templates',
  labels: {
    singular: 'Template',
    plural: 'Templates',
  },
  admin: {
    group: 'Campaigns',
    preview: (data) => `/templates/${data.id}`,
    livePreview: { url: ({ data }) => `/templates/${data.id}` },
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
        editorProps: {
          height: '50vh',
        },
      },
    },
    {
      name: 'css',
      type: 'code',
      admin: {
        language: 'css',
        editorOptions: {},
        editorProps: {
          height: '50vh',
        },
      },
    },
  ],
}
