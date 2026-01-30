import payload from 'payload'
import type { SanitizedConfig } from 'payload'

import { campaignSeed } from './Campaigns.seed'
import { subscriberSeed } from './Subscribers.seed'
import { tagSeed } from './Tags.seed'
import { templateSeed } from './Templates.seed'
import { userSeed } from './Users.seed'

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  await subscriberSeed(payload)
  await tagSeed(payload)
  await templateSeed(payload)
  await userSeed(payload)
  await campaignSeed(payload)

  payload.logger.info('Successfully seeded!')
  process.exit(0)
}
