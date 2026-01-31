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
    defaultColumns: ['slug', 'title', 'status', 'fromAddress', 'subject'],
    useAsTitle: 'title',
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
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    slugField({
      useAsSlug: 'title',
      position: 'sidebar',
    }),
    {
      name: 'subject',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'fromAddress',
      type: 'email',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
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
    afterChange: [({ collection, context, data, operation, req }) => {}],
  },
}
