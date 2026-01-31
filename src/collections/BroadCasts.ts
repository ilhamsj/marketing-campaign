import type { CollectionConfig } from 'payload'

export const Broadcasts: CollectionConfig = {
  slug: 'broadcasts',
  fields: [
    {
      name: 'campaign',
      type: 'relationship',
      relationTo: 'campaigns',
    },
    {
      name: 'subscriber',
      type: 'relationship',
      relationTo: 'subscribers',
    },
  ],
}
