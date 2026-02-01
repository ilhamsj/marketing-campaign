import type { Payload, SanitizedConfig } from 'payload'
import { faker } from '@faker-js/faker'

import payload from 'payload'

export const workflowsSeed = async (payload: Payload, totalDocs: number = 3) => {
  for (let index = 0; index < totalDocs; index++) {
    const nodes = Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map((_, index) => ({
      id: faker.string.uuid(),
      position: {
        x: (index % 5) * 100,
        y: Math.floor(index / 5) * 100,
      },
      data: {
        label: `Node ${index}`,
      },
      type: 'textUpdater',
      measured: {
        width: 60,
        height: 60,
      },
      selected: true,
      dragging: false,
    }))

    const edges = Array.from({ length: nodes.length - 1 }).map((_, index) => ({
      id: faker.string.uuid(),
      source: nodes[index].id,
      sourceHandle: 'a',
      target: nodes[index + 1].id,
      animated: faker.helpers.maybe(() => true, { probability: 0.5 }),
    }))

    await payload.create({
      collection: 'workflows',
      data: {
        name: faker.animal.bird(),
        nodes: nodes ?? [],
        edges: edges ?? [],
      },
    })
  }

  payload.logger.info('Successfully seeded workflows!')
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await workflowsSeed(payload, 1)
  process.exit(0)
}
