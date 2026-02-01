import type { Payload, SanitizedConfig } from 'payload'
import { faker } from '@faker-js/faker'

import payload from 'payload'

export const broadcastSeed = async (payload: Payload, totalDocs: number = 10) => {
  const campaigns = await payload.find({
    collection: 'campaigns',
    limit: -1,
    depth: 0,
  })

  const subscribers = await payload.find({
    collection: 'subscribers',
    limit: -1,
  })

  if (subscribers.totalDocs === 0) {
    payload.logger.error('No subscribers found!')
    return
  }

  if (campaigns.totalDocs === 0) {
    payload.logger.error('No campaigns found!')
    return
  }

  for (let index = 0; index < totalDocs; index++) {
    await payload.create({
      collection: 'broadcasts',
      data: {
        campaign: faker.helpers.arrayElement(campaigns.docs).id,
        subscriber: faker.helpers.arrayElement(subscribers.docs).id,
      },
    })
  }

  payload.logger.info('Successfully seeded broadcasts!')
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await broadcastSeed(payload)
  process.exit(0)
}
