import type { Payload, SanitizedConfig } from 'payload'
import { faker } from '@faker-js/faker'

import payload from 'payload'

export const subscriberSeed = async (payload: Payload, totalDocs: number = 10) => {
  const { docs } = await payload.find({
    collection: 'tags',
    limit: 100,
  })

  for (let index = 0; index < totalDocs; index++) {
    await payload.create({
      collection: 'subscribers',
      data: {
        email: faker.internet.email(),
        name: faker.person.firstName(),
        tags: faker.helpers.arrayElements(docs, { min: 0, max: 3 }).map((tag) => tag.id),
        attributes: [
          {
            key: 'gender',
            value: faker.person.gender(),
          },
          {
            key: 'sex',
            value: faker.person.sex(),
          },
        ],
      },
    })
  }

  payload.logger.info('Successfully seeded!')
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await subscriberSeed(payload)
  process.exit(0)
}
