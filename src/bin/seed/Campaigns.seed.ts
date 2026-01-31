import type { Payload, SanitizedConfig } from 'payload'
import { faker } from '@faker-js/faker'

import payload from 'payload'
import { slugify } from 'payload/shared'

export const campaignSeed = async (payload: Payload) => {
  const templates = await payload.find({
    collection: 'templates',
    limit: -1,
  })

  const queryPresets = await payload.find({
    collection: 'payload-query-presets',
    limit: -1,
  })

  const tags = await payload.find({
    collection: 'tags',
    limit: -1,
  })

  const campaignsIds: string[] = []
  for (let index = 0; index < 10; index++) {
    const campaignTitle = faker.commerce.productName()
    const campaign = await payload.create({
      collection: 'campaigns',
      data: {
        general: {
          title: campaignTitle,
          slug: slugify(campaignTitle) ?? faker.lorem.slug(4),
          subject: faker.commerce.productDescription(),
          fromAddress: faker.helpers.arrayElement(['marketing@example.com', 'dev@example.com']),
        },
        segments: {
          ...(tags.totalDocs > 0 && {
            tags: faker.helpers.arrayElements(tags.docs).map((doc) => doc.id),
          }),
          ...(queryPresets.totalDocs > 0 && {
            filters: faker.helpers.arrayElement(queryPresets.docs).id,
          }),
        },
        content: {
          template: faker.helpers.arrayElement(templates.docs).id,
        },
      },
      draft: false,
      depth: 0,
    })

    campaignsIds.push(campaign.id)
  }

  payload.logger.info({ campaignsIds, message: 'Successfully seeded campaigns!' })
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await campaignSeed(payload)
  process.exit(0)
}
