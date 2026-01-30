import type { Payload, SanitizedConfig } from 'payload'
import { faker } from '@faker-js/faker'

import payload from 'payload'

export const campaignSeed = async (payload: Payload) => {
  const { docs } = await payload.find({
    collection: 'templates',
    limit: 100,
  })

  for (let index = 0; index < 10; index++) {
    await payload.create({
      collection: 'campaigns',
      data: {
        name: faker.person.firstName(),
        subject: faker.lorem.sentence(),
        fromAddress: faker.internet.email(),
        template: faker.helpers.arrayElement(docs).id,
      },
    })
  }

  payload.logger.info('Successfully seeded!')
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await campaignSeed(payload)
  process.exit(0)
}
