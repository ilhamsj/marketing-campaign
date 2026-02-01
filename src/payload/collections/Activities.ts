import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  fields: [
    {
      name: 'broadcast',
      type: 'relationship',
      relationTo: 'broadcasts',
    },
    {
      name: 'action',
      type: 'select',
      options: [
        { label: 'Sent', value: 'sent' },
        { label: 'Failed', value: 'failed' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Opened', value: 'opened' },
        { label: 'Clicked', value: 'clicked' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
        { label: 'Bounced', value: 'bounced' },
      ],
      required: true,
    },
    {
      name: 'link',
      type: 'text',
    },
  ],
}
