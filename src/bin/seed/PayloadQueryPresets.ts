import type { Payload, SanitizedConfig } from 'payload'
import payload from 'payload'

export const payloadQueryPresetsSeed = async (payload: Payload) => {
  await payload.create({
    collection: 'payload-query-presets',
    data: {
      relatedCollection: 'subscribers',
      title: 'gender-female',
      isShared: true,
      access: {
        delete: {
          constraint: 'everyone',
        },
        read: {
          constraint: 'everyone',
        },
        update: {
          constraint: 'everyone',
        },
      },
      where: {
        or: [
          {
            and: [
              {
                'attributes.key': {
                  equals: 'gender',
                },
              },
              {
                'attributes.value': {
                  equals: 'female',
                },
              },
            ],
          },
        ],
      },
    },
  })

  payload.logger.info('Successfully seeded!')
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await payloadQueryPresetsSeed(payload)
  process.exit(0)
}
