import { CampaignsTemplate } from '@/payload-types'
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
      name: 'code',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
      },
    },
  ],
}
