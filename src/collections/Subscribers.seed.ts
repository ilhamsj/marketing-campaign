
import type { SanitizedConfig } from 'payload'
import { faker } from '@faker-js/faker';

import payload from 'payload'

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  for (let index = 0; index < 10; index++) {    
    await payload.create({
      collection: 'subscribers',
      data: {
        email: faker.internet.email(),
        name: faker.person.firstName(),
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
  process.exit(0)
}