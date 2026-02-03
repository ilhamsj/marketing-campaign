import { CollectionConfig } from 'payload'

export const fields: CollectionConfig['fields'] = [
  {
    name: 'campaign',
    type: 'relationship',
    relationTo: 'campaigns',
    required: true,
  },
  {
    name: 'subscriber',
    type: 'relationship',
    relationTo: 'subscribers',
    required: true,
  },
]
