import { CollectionConfig } from 'payload'

export const admin: CollectionConfig['admin'] = {
  defaultColumns: ['slug', 'title', 'status', 'fromAddress', 'subject'],
  useAsTitle: 'title',
  preview: (data) => `/campaigns/${data.slug}`,
  livePreview: { url: ({ data }) => `/campaigns/${data.slug}` },
}
