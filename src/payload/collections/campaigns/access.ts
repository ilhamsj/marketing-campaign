import { Campaign } from '@payload-types'
import { Access, CollectionConfig } from 'payload'

const accessUpdate: Access<Campaign> = ({ data }): boolean => {
  if (typeof data !== 'object') return false
  //   if (data._status === 'draft') return true
  //   if (data._status === 'published') return false
  return true
}

export const access: CollectionConfig['access'] = {
  update: accessUpdate,
}
