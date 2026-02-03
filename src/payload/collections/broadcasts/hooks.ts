import { Broadcast, Subscriber } from '@/payload/payload-types'
import { BasePayload, CollectionAfterChangeHook, CollectionConfig } from 'payload'
import Handlebars from 'handlebars'
import * as cheerio from 'cheerio'

const replaceLinkToTrackLink = async (payload: BasePayload, doc: Broadcast, htmlResult: string) => {
  const $ = cheerio.load(htmlResult)

  const links = $('a[href]').toArray()

  for (const el of links) {
    const originalUrl = $(el).attr('href')

    if (!originalUrl) continue
    if (originalUrl.startsWith('mailto:')) continue
    if (originalUrl.startsWith('#')) continue

    const click = await payload.create({
      collection: 'activities',
      data: {
        broadcast: doc.id,
        action: 'clicked',
        link: originalUrl,
      },
      depth: 0,
    })

    payload.logger.info({ clickId: click.id, originalUrl })

    $(el).attr('href', `http://localhost:3000/c/${click.id}`)
  }

  return $.html()
}

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

  const trackView = `<img src="http://localhost:3000/track/broadcasts/${doc.id}" alt="" />`
  const htmlResultV2 = await replaceLinkToTrackLink(payload, doc, htmlResult)

  const email = await payload.sendEmail({
    to: subsriber.email,
    subject: subjectResult,
    text: subjectResult,
    html: `${rawTemplate.css ? `<style>${rawTemplate.css}</style>` : ''} ${htmlResultV2} ${trackView}`,
  })

  payload.logger.info({ email })
}

export const hooks: CollectionConfig['hooks'] = {
  afterChange: [triggerEmailSending],
}
