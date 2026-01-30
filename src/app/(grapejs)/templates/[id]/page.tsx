import configPromise from '@payload-config'
import { getPayload } from 'payload'

import GrapeJSEditor from './GrapeJSEditor'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function page({ params }: Props) {
  const payload = await getPayload({
    config: configPromise,
  })

  const { id } = await params
  const { docs } = await payload.find({
    collection: 'media',
    depth: 0,
  })

  const assets = docs.map((item) => item.url ?? '').filter(Boolean)
  const template = await payload
    .findByID({
      collection: 'templates',
      id,
    })
    .catch(notFound)

  return <GrapeJSEditor template={template} assets={assets} />
}
