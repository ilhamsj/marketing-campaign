'use client'
import { LoadingOverlay, SelectField, usePayloadAPI } from '@payloadcms/ui'
import { PayloadQueryPreset } from '@payload-types'
import type { SelectFieldClientComponent } from 'payload'

export const CustomSelectFieldClient: SelectFieldClientComponent = (props) => {
  const [{ data, isError, isLoading }] = usePayloadAPI('/api/payload-query-presets', {
    initialParams: { depth: 0 },
  })

  if (isLoading) return <LoadingOverlay />
  if (isError) return <p className="text-red-500">Error occurred while fetching data.</p>

  return (
    <SelectField
      {...props}
      path="filters"
      field={{
        ...props.field,
        name: 'filters',
        options: data?.docs.map((doc: PayloadQueryPreset) => ({
          label: doc.title,
          value: doc.id,
        })),
      }}
    />
  )
}
