'use client'

import dynamic from 'next/dynamic'
import type { ComicBook } from '../types/comic' // adjust this path or inline type

const CoverViewer = dynamic(() => import('./CoverViewer'), {
  ssr: false,
})

export default function CoverViewerWrapper({ comic }: { comic: ComicBook }) {
  return <CoverViewer comic={comic} />
}