import type { SanitizedConfig } from 'payload'
import payload from 'payload'
import { campaignSeed } from '@/collections/Campaigns.seed'
import { subscriberSeed } from '@/collections/Subscribers.seed'
import { tagSeed } from '@/collections/Tags.seed'
import { templateSeed } from '@/collections/Templates.seed'
import { userSeed } from '@/collections/Users.seed'

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
