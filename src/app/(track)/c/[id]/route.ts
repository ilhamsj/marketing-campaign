import configPromise from '@payload-config'
import { redirect } from 'next/navigation'
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

  const activity = await payload.update({
    collection: 'activities',
    id: id,
    data: {
      action: 'clicked',
      ip: request.headers.get('cf-connecting-ip'),
      userAgent: request.headers.get('user-agent'),
    },
  })

  payload.logger.debug({ id, activity })
  return redirect(activity.link ?? '/')
}
