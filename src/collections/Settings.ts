import type { CollectionConfig } from 'payload'

export const Settings: CollectionConfig = {
  slug: 'settings',
  fields: [
    // tab
    {
        type: 'tabs',
        tabs: [
            {
                label: 'General',
                fields: [
                    {
                        name: 'siteName',
                        type: 'text',
                        required: true,
                    },
                    {
                        name: 'url',
                        type: 'text',
                        required: true,
                    },
                ],
            },
            {
                label: 'SMTP',
                fields: [
                    {
                        name: 'host',
                        type: 'text',
                        required: true,
                    },
                    {
                        name: 'port',
                        type: 'number',
                        required: true,
                    },
                ],
            },
        ],
    }
  ],
}
