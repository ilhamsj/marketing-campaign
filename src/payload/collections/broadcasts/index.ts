import { type CollectionConfig } from 'payload'
import { fields } from './fields'
import { hooks } from './hooks'

export const Broadcasts: CollectionConfig = {
  slug: 'broadcasts',
  fields: fields,
  hooks: hooks,
}
