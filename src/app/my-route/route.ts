import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const item = await payload.findByID({
    collection: 'templates',
    id: '697c3e43fe66863b8758cb7b',
  })
  if (!item) {
    return Response.json({
      message: 'Item not found',
    })
  }

  const email = await payload.sendEmail({
    to: 'test@example.com',
    subject: 'This is a test email',
    text: 'This is my message body',
    html: `<style>${item.css}</style>${item.html}`,
  })

  return Response.json(email)
}
