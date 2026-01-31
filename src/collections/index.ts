import { CollectionConfig } from 'payload'
import { Campaigns } from './Campaigns'
import { Templates } from './Templates'
import { Media } from './Media'
import { Settings } from './Settings'
import { Subscribers } from './Subscribers'
import { Tags } from './Tags'
import { Users } from './Users'
import { Broadcasts } from './BroadCasts'
import { Activities } from './Activities'

export const collections: CollectionConfig[] = [
  Activities,
  Broadcasts,
  Campaigns,
  Media,
  Settings,
  Subscribers,
  Tags,
  Templates,
  Users,
]
