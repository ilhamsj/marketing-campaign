import type { CollectionConfig } from 'payload'

export const Campaigns: CollectionConfig = {
  slug: ('Campaigns').toLowerCase(),
  labels: {
    plural: 'All Campaigns',
    singular: 'All Campaigns',
  },
  admin: {
    group: 'Campaigns',
  },
  fields: [
    // tab
    {
        type: 'tabs',
        tabs: [
            {
                label: 'Campaign',
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
                        type: 'text',
                        required: true,
                    },
                ],
            },
            {
                label: 'Content',
                fields: [
                    {
                        name: 'content',
                        type: 'richText',
                        required: true,
                    },
                ],
            },
        ],
    }
  ],
}
