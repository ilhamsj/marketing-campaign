import { FlowWithAPI } from './components'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  const payload = await getPayload({
    config: configPromise,
  })

  const workflow = await payload
    .findByID({
      collection: 'workflows',
      id,
    })
    .catch(notFound)

  return <FlowWithAPI workflow={workflow} />
}
