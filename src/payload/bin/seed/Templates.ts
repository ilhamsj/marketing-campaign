import type { Payload, SanitizedConfig } from 'payload'
import { faker } from '@faker-js/faker'

import payload from 'payload'

export const templateSeed = async (payload: Payload, totalDocs: number = 3) => {
  for (let index = 0; index < totalDocs; index++) {
    await payload.create({
      collection: 'templates',
      data: {
        name: faker.person.firstName(),
        html: `<div><h1>Hi {{name}}, welcome to ${faker.company.name()}!</h1><p>Here is your newsletter content</p>
        <ul>
          <li><a target="_blank" href="http://localhost:3000/reports?utm=email">Visit our Reports</a></li>
          <li><a target="_blank" href="http://localhost:3000?utm=email">Visit our Broadcasts</a></li>
          <li><a target="_blank" href="http://localhost:3000/unsubscribe?utm=email">Unsubscribe</a></li>
          </ul>
        </div>`,
        css: `h1 { color: ${faker.color.rgb()}; } p { color: ${faker.color.rgb()}; }`,
      },
    })
  }

  payload.logger.info('Successfully seeded!')
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await templateSeed(payload)
  process.exit(0)
}
