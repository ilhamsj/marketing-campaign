'use client'

import { Workflow } from '@payload-types'
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
  Panel,
} from '@xyflow/react'
import { useCallback, useEffect, useRef } from 'react'
import { nodeTypes } from './node/TextUpdaterNode'

const getNodeId = (ids: number[]): number => {
  const set = new Set(ids)
  let id = 1
  while (set.has(id)) id++
  return id
}

export function FlowWithAPI({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState((workflow.nodes ?? []) as Node[])
  const [edges, setEdges, onEdgesChange] = useEdgesState((workflow.edges ?? []) as Edge[])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  const timer = useRef<number>(0)

  useEffect(() => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      onSave()
    }, 1000)
  }, [nodes, edges])

  const onAdd = useCallback(() => {
    const newNode = {
      id: String(getNodeId(nodes.map((node) => Number(node.id)))),
      data: { label: 'Added node' },
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
    }

    setNodes((nds) => [...nds, newNode])
  }, [setNodes, nodes])

  const onSave = useCallback(() => {
    fetch(`/api/workflows/${workflow.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    })
  }, [nodes, edges, workflow.id])

  return (
    <div style={{ height: '100vh', width: '100%', margin: 'auto' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      >
        <MiniMap nodeStrokeWidth={3} pannable zoomable />
        <Background />
        <Controls />
        <Panel position="top-right">
          <button className="xy-theme__button" onClick={onSave}>
            save
          </button>
          <button className="xy-theme__button" onClick={() => {}}>
            restore
          </button>
          <button className="xy-theme__button" onClick={onAdd}>
            add node
          </button>
        </Panel>
      </ReactFlow>
    </div>
  )
}
