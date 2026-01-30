'use client'

import 'grapesjs/dist/css/grapes.min.css'

import { CampaignsTemplate } from '@/payload-types'
import { useEffect, useRef } from 'react'
import grapesjs, { Editor, EditorConfig, ProjectData } from 'grapesjs'
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
      const storageManagerConfig: EditorConfig['storageManager'] = {
        type: 'remote',
        autoload: false,
        autosave: true,
        options: {
          remote: {
            urlStore: `/api/templates/${template.id}`,
            fetchOptions: (opts) => (opts.method === 'POST' ? { method: 'PATCH' } : {}),
          },
        },
        onStore: (data, editor) => {
          console.log({ data })
          return {
            html: editor.getHtml(),
            css: editor.getCss(),
          }
        },
      }

      const config: EditorConfig = {
        storageManager: storageManagerConfig,
        assetManager: {
          assets,
        },
        container: editorRef.current,
        height: '100vh',
        width: '100%',
        plugins: [plugin],
        components: template.html,
        style: template.css,
      }

      editorInstance.current = grapesjs.init(config)
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy()
        editorInstance.current = null
      }
    }
  }, [template.id])

  return <div ref={editorRef} style={{ width: '100%', height: '100vh' }} />
}
