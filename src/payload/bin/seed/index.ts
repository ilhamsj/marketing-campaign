import payload from 'payload'
import type { SanitizedConfig } from 'payload'

import { activitiesSeed } from './Activities'
import { broadcastSeed } from './Broadcasts'
import { campaignSeed } from './Campaigns'
import { subscriberSeed } from './Subscribers'
import { tagSeed } from './Tags'
import { templateSeed } from './Templates'
import { usersSeed } from './Users'
import { workflowsSeed } from './Workflows'
import { payloadQueryPresetsSeed } from './PayloadQueryPresets'

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  await subscriberSeed(payload, 20)
  await tagSeed(payload, 5)
  await templateSeed(payload, 3)
  await usersSeed(payload)
  await campaignSeed(payload, 3)

  // await broadcastSeed(payload, 20)
  // await activitiesSeed(payload, 40)

  await workflowsSeed(payload, 1)
  await payloadQueryPresetsSeed(payload)

  payload.logger.info('Successfully seeded!')
  process.exit(0)
}
