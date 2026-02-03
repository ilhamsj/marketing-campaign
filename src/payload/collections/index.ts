import { Activities } from './Activities'
import { Broadcasts } from './broadcasts'
import { Campaigns } from './campaigns'
import { CollectionConfig } from 'payload'
import { Media } from './Media'
import { Subscribers } from './Subscribers'
import { Tags } from './Tags'
import { Templates } from './Templates'
import { Users } from './Users'
import { Workflows } from './Wofkflows'

export const collections: CollectionConfig[] = [
  Activities,
  Broadcasts,
  Campaigns,
  Media,
  Subscribers,
  Tags,
  Templates,
  Users,
  Workflows,
]
