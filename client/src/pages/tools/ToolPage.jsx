import React, { lazy, Suspense } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import { getToolBySlug } from '../../config/tools'
import ToolTemplate from '../../components/tools/ToolTemplate'

// Map slug → lazy-loaded existing page component
const IMPLEMENTED_PAGES = {
  'pdf-merger':       lazy(() => import('./PdfMergerPage')),
  'pdf-to-jpg':       lazy(() => import('./PdfToJpgPage')),
  'jpg-to-png':       lazy(() => import('./JpgToPngPage')),
  'jpg-to-pdf':       lazy(() => import('./PdfMergerPage')),   // reuses merger (images→pdf mode)
  'image-resizer':    lazy(() => import('./ImageResizerPage')),
  'image-converter':  lazy(() => import('./ImageConverterPage')),
  'image-compressor': lazy(() => import('./ImageCompressorPage')),
  'profile-picture':  lazy(() => import('./ProfilePicturePage')),
  'id-card-joiner':   lazy(() => import('./IdCardJoinerPage')),
  'date-on-photo':    lazy(() => import('./DateOnPhotoPage')),
}

const PageLoader = () => (
  <div style={{
    minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <Spin size="large" tip="Loading tool..." />
  </div>
)

export default function ToolPage() {
  const { slug } = useParams()
  const tool = getToolBySlug(slug)

  // Tool not found → 404
  if (!tool) {
    return <Navigate to="/" replace />
  }

  // Implemented tool → load existing page
  if (tool.implemented && IMPLEMENTED_PAGES[slug]) {
    const PageComponent = IMPLEMENTED_PAGES[slug]
    return (
      <Suspense fallback={<PageLoader />}>
        <PageComponent />
      </Suspense>
    )
  }

  // Not yet implemented → show Coming Soon template
  return <ToolTemplate tool={tool} />
}
