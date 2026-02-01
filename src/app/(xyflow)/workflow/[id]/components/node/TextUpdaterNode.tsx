import { Handle, NodeTypes, Position } from '@xyflow/react'
import Image from 'next/image'

function TextUpdaterNode() {
  return (
    <div>
      <div className="relative w-15 h-15 border border-black rounded bg-white">
        <Image
          src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=128"
          alt="Slack"
          fill
          className="object-contain p-2"
        />
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  )
}

export const nodeTypes: NodeTypes = {
  textUpdater: TextUpdaterNode,
}
