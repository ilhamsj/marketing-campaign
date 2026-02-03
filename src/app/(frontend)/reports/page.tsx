import React from 'react'
import { ChartAreaInteractive } from './ChartAreaInteractive'
import { ChartLineDefault } from './ChartLineDefault'
import { ChartLineInteractive } from './ChartLineInteractive'
import { ChartBarMultiple } from './ChartBarMultiple'

export default function Page() {
  return (
    <div className="grid grid-cols-2">
      <ChartAreaInteractive />
      <ChartLineInteractive />
      <ChartLineDefault />
      <ChartBarMultiple />
    </div>
  )
}
