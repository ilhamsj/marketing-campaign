import payload from 'payload'
import type { SanitizedConfig } from 'payload'

import { activitiesSeed } from './Activities'
import { broadcastSeed } from './Broadcasts'
import { campaignSeed } from './Campaigns'
import { subscriberSeed } from './Subscribers'
import { tagSeed } from './Tags'
import { templateSeed } from './Templates'
import { usersSeed } from './Users'

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  await subscriberSeed(payload, 2000)
  await tagSeed(payload, 5)
  await templateSeed(payload, 3)
  await usersSeed(payload)
  await campaignSeed(payload, 3)
  await broadcastSeed(payload, 2000)
  await activitiesSeed(payload, 4000)

  payload.logger.info('Successfully seeded!')
  process.exit(0)
}
