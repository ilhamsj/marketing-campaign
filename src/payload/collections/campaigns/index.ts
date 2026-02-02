import { type CollectionConfig } from 'payload'
import { admin } from './admin'
import { fields } from './fields'
import { hooks } from './hooks'

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  admin: admin,
  fields: fields,
  trash: true,
  hooks: hooks,
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: {
        timeFormat: 'hh:mm',
        timeIntervals: 60,
      },
    },
  },
}
