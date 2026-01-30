import { faker } from '@faker-js/faker'
import payload from 'payload'
import type { Payload, SanitizedConfig } from 'payload'

export const tagSeed = async (payload: Payload) => {
  for (let index = 0; index < 10; index++) {
    await payload.create({
      collection: 'tags',
      data: {
        name: faker.hacker.noun(),
        description: faker.lorem.sentence(),
      },
    })
  }

  payload.logger.info('Successfully seeded!')
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await tagSeed(payload)
  process.exit(0)
}
