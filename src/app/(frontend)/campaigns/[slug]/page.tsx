import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload, Where } from 'payload'
import { stringify } from 'qs-esm'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function page({ params }: Props) {
  const payload = await getPayload({
    config: configPromise,
  })

  const { slug } = await params

  const { docs, totalDocs } = await payload.find({
    collection: 'campaigns',
    where: {
      slug: { equals: slug },
    },
  })

  if (totalDocs === 0) return notFound()
  const doc = docs[0]

  let presets = null
  if (doc.segments?.filters) {
    presets = await payload.findByID({
      collection: 'payload-query-presets',
      id: doc.segments.filters,
    })
  }

  const stringifiedQuery = stringify(
    {
      where: presets?.where,
    },
    { addQueryPrefix: true },
  )

  const subscribers = await payload.find({
    collection: 'subscribers',
    where: presets?.where as Where,
  })

  return (
    <div>
      {doc.title}
      <p>{JSON.stringify(presets?.where, null, 2)}</p>
      <p>{stringifiedQuery}</p>
      <p>{subscribers.totalDocs}</p>
    </div>
  )
}
