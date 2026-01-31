'use client'

import { FieldLabel } from '@payloadcms/ui'
import { PayloadQueryPreset } from '@/payload-types'
import { SelectField, usePayloadAPI } from '@payloadcms/ui'
import React from 'react'
import type { RelationshipFieldLabelClientComponent } from 'payload'

export const CustomSelectPayloadQueryPresetsLabel: RelationshipFieldLabelClientComponent = ({
  field,
  path,
}) => {
  return <FieldLabel label={field?.label || field?.name} path={path} required={field?.required} />
}

export const CustomSelectPayloadQueryPresetsField: React.FC = () => {
  // Fetch data from a collection item using its ID
  const [{ data, isError, isLoading }, { setParams }] = usePayloadAPI(
    '/api/payload-query-presets',
    {
      initialParams: { depth: 0 },
    },
  )

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error occurred while fetching data.</p>

  return (
    <SelectField
      field={{
        name: 'filters',
        options: data?.docs.map((doc: PayloadQueryPreset) => ({
          label: doc.title,
          value: doc.id,
        })),
      }}
      path="filters"
      value={undefined}
      onChange={(e) => console.log(e)}
    />
  )
}
