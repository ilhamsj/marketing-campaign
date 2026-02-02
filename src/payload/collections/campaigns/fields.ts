import { CollectionConfig, slugField } from 'payload'

export const fields: CollectionConfig['fields'] = [
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
                  '@/payload/collections/Fields/select/components/client/Label#CustomSelectFieldLabelClient',
                Field:
                  '@/payload/collections/Fields/select/components/client/Field#CustomSelectFieldClient',
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
]
