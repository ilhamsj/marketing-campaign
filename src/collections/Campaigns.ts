import { Campaign } from '@/payload-types'
import { Access, slugField, type CollectionConfig } from 'payload'

const update: Access<Campaign> = ({ data }) => {
  if (typeof data !== 'object') return false
  // if (data._status === 'draft') return true
  // if (data._status === 'published') return false
  return true
}

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  admin: {
    defaultColumns: ['id', 'general.title', 'status', 'general.fromAddress', 'general.slug'],
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: {
        timeFormat: 'hh:mm',
        timeIntervals: 60,
      },
    },
  },
  access: {
    update,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'general',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            slugField({
              useAsSlug: 'general.title',
            }),
            {
              name: 'subject',
              type: 'text',
              required: true,
            },
            {
              name: 'fromAddress',
              type: 'email',
              required: true,
            },
          ],
        },
        {
          name: 'segments',
          fields: [
            {
              label: 'Static Segments',
              name: 'tags',
              type: 'relationship',
              relationTo: 'tags',
              hasMany: true,
            },
            {
              label: 'Dynamic Segments',
              name: 'filters',
              type: 'text',
              admin: {
                components: {
                  Label:
                    '@/collections/Fields/select/components/client/Label#CustomSelectFieldLabelClient',
                  Field:
                    '@/collections/Fields/select/components/client/Field#CustomSelectFieldClient',
                },
              },
            },
          ],
        },
        {
          name: 'content',
          fields: [
            {
              name: 'template',
              type: 'relationship',
              relationTo: 'templates',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ collection, context, operation, req, data, originalDoc }) => {
        //
      },
    ],
    beforeChange: [
      ({ collection, context, data, operation, req, originalDoc }) => {
        //
      },
    ],
  },
}
