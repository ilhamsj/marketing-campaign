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

  const email = await payload.sendEmail({
    to: 'test@example.com',
    subject: doc.subject,
    text: doc.subject,
    html: template.html,
  })

  payload.logger.info({ msg: 'Email sent', email, doc })
}

export const hooks: CollectionConfig['hooks'] = {
  afterChange: [triggerEmailSending],
}
