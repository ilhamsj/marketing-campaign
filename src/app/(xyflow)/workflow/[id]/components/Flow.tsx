'use client'

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
import { useCallback } from 'react'

const initialNodes: Node[] = [
  {
    id: 'n1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    type: 'input',
  },
  {
    id: 'n2',
    position: { x: -100, y: 100 },
    data: { label: 'Node 2' },
  },
  {
    id: 'n3',
    position: { x: 100, y: 100 },
    data: { label: 'Node 3' },
  },
]

const initialEdges: Edge[] = [
  {
    id: 'n1-n2',
    // type: 'step',
    // label: 'connects with',
    source: 'n1',
    target: 'n2',
  },
  {
    id: 'n1-n3',
    // type: 'step',
    // label: 'connects with',
    source: 'n1',
    target: 'n3',
  },
]

export function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [setEdges],
  )

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
