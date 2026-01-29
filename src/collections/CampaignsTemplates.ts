import type { CollectionConfig } from 'payload'

export const CampaignsTemplates: CollectionConfig = {
  slug: 'campaigns-templates',
  labels: {
    singular: 'Template',
    plural: 'Templates',
  },
  admin: {
    group: 'Campaigns',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'code',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
      },
    },
  ],
}
