import type { Payload, SanitizedConfig } from 'payload'
import { faker } from '@faker-js/faker'

import payload from 'payload'

export const activitiesSeed = async (payload: Payload, totalDocs: number = 10) => {
  const broadcasts = await payload.find({
    collection: 'broadcasts',
    limit: -1,
    depth: 0,
  })
  if (broadcasts.totalDocs === 0) {
    payload.logger.error('No broadcasts found!')
    return
  }

  for (let index = 0; index < totalDocs; index++) {
    const action = faker.helpers.arrayElement([
      'sent',
      'failed',
      'delivered',
      'opened',
      'clicked',
      'unsubscribed',
      'bounced',
    ])

    const isClicked = action === 'clicked'

    await payload.create({
      collection: 'activities',
      data: {
        broadcast: faker.helpers.arrayElement(broadcasts.docs).id,
        action,
        ...(isClicked && { link: faker.internet.url() }),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.past().toISOString(),
      },
    })
  }

  payload.logger.info('Successfully seeded activities!')
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await activitiesSeed(payload)
  process.exit(0)
}
