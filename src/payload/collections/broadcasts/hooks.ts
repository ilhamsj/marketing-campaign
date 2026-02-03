import { Broadcast, Subscriber } from '@/payload/payload-types'
import { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import Handlebars from 'handlebars'

const triggerEmailSending: CollectionAfterChangeHook<Broadcast> = async (args) => {
  const { previousDoc, doc, operation, req } = args
  const { payload } = req

  const subsriber = await payload.findByID({
    collection: 'subscribers',
    id: typeof doc.subscriber === 'string' ? doc.subscriber : doc.subscriber?.id,
    depth: 0,
  })

  const campaign = await payload.findByID({
    collection: 'campaigns',
    id: typeof doc.campaign === 'string' ? doc.campaign : doc.campaign?.id,
    depth: 0,
  })

  const rawTemplate = await payload.findByID({
    collection: 'templates',
    id:
      typeof campaign.content.template === 'string'
        ? campaign.content.template
        : campaign.content.template.id,
  })

  const message = Handlebars.compile<Subscriber>(rawTemplate.html)
  const htmlResult = message(subsriber)

  const subject = Handlebars.compile<Subscriber>(campaign.subject)
  const subjectResult = subject(subsriber)

  const email = await payload.sendEmail({
    to: subsriber.email,
    subject: subjectResult,
    text: subjectResult,
    html: `${rawTemplate.css ? `<style>${rawTemplate.css}</style>` : ''} ${htmlResult}`,
  })

  payload.logger.info({ email })
}

export const hooks: CollectionConfig['hooks'] = {
  afterChange: [triggerEmailSending],
}
