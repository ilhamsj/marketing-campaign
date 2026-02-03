import configPromise from '@payload-config'
import { getPayload } from 'payload'

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: Request, { params }: Props) {
  const payload = await getPayload({
    config: configPromise,
  })

  const { id } = await params

  const activity = await payload.create({
    collection: 'activities',
    data: {
      broadcast: id,
      action: 'opened',
      ip: request.headers.get('cf-connecting-ip'),
      userAgent: request.headers.get('user-agent'),
    },
  })

  payload.logger.info({ id, activity })

  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  })
}
