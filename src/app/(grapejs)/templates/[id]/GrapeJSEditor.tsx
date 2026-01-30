'use client'

import 'grapesjs/dist/css/grapes.min.css'

import { CampaignsTemplate } from '@/payload-types'
import { useEffect, useRef } from 'react'
import grapesjs, { Editor, EditorConfig } from 'grapesjs'
import plugin from 'grapesjs-preset-newsletter'

type Props = {
  template: CampaignsTemplate
  assets: string[]
}

export default function GrapeJSEditor({ template, assets }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const editorInstance = useRef<Editor | null>(null)

  useEffect(() => {
    if (editorRef.current && !editorInstance.current) {
      const config: EditorConfig = {
        container: editorRef.current,
        // Get the content for the canvas directly from the element
        // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
        fromElement: true,
        // Size of the editor
        height: '100vh',
        width: '100%',
        // Disable the storage manager for the moment
        storageManager: false,
        // Avoid any default panel
        panels: { defaults: [] },
        plugins: [plugin],
      }

      editorInstance.current = grapesjs.init(config)
      editorInstance.current.AssetManager.add(assets)
      editorInstance.current.setComponents(template.code)
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy()
        editorInstance.current = null
      }
    }
  }, [])

  return <div ref={editorRef} style={{ width: '100%', height: '100vh' }} />
}
