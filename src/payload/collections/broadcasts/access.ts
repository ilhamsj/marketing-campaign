import { CollectionConfig } from 'payload'

export const access: CollectionConfig['access'] = {
  update: () => false,
  delete: () => false,
}
