import { Campaign } from '@/payload/payload-types'
import { CollectionAfterChangeHook, CollectionConfig } from 'payload'

const triggerEmailSending: CollectionAfterChangeHook<Campaign> = async (args) => {
  const { previousDoc, doc, operation, req } = args
  const { payload } = req

  const template = await payload
    .findByID({
      collection: 'templates',
      id: typeof doc.content.template === 'string' ? doc.content.template : doc.content.template.id,
    })
    .catch(() => {
      payload.logger.info({ msg: 'Template not found', templateId: doc.content.template })
    })

  if (!template) return

  if (typeof doc.segments?.filters === 'string') {
    const subsribers = await payload.find({
      collection: 'subscribers',
      select: {
        id: true,
        name: true,
      },
      where: {
        and: [
          {
            tags: {
              in: doc.segments?.tags,
            },
          },
        ],
      },
      depth: 0,
      limit: -1,
    })

    const broadcasts = await Promise.all(
      subsribers.docs.map(async (subscriber) => {
        return await payload.create({
          collection: 'broadcasts',
          data: {
            campaign: doc.id,
            subscriber: subscriber.id,
          },
          depth: 0,
        })
      }),
    )

    payload.logger.info({ msg: 'Email sent', subsribers: subsribers.totalDocs, broadcasts, doc })
  } else {
    payload.logger.info({ msg: 'No filters found', doc })
  }
}

export const hooks: CollectionConfig['hooks'] = {
  afterChange: [triggerEmailSending],
}
