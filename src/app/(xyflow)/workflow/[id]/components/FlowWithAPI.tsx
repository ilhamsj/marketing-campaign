'use client'

import { Workflow } from '@/payload-types'
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  Connection,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react'
import { useCallback, useEffect, useRef } from 'react'

export function FlowWithAPI({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(workflow.nodes as Node[])
  const [edges, setEdges, onEdgesChange] = useEdgesState(workflow.edges as Edge[])
  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [setEdges],
  )

  const timer = useRef<number>(0)

  useEffect(() => {
    window.clearTimeout(timer.current)

    timer.current = window.setTimeout(() => {
      fetch(`/api/workflows/${workflow.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      })
      console.log({ edges, nodes })
    }, 1000)
  }, [nodes, edges])

  return (
    <div style={{ height: '100vh', width: '100%', margin: 'auto' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap nodeStrokeWidth={3} pannable zoomable />
      </ReactFlow>
    </div>
  )
}
