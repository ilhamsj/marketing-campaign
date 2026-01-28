import { faker } from '@faker-js/faker';
import payload from 'payload'
import type { SanitizedConfig } from 'payload'

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

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
  process.exit(0)
}