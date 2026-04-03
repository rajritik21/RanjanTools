import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Progress, message, Slider, Spin } from 'antd'
import { UploadOutlined, DownloadOutlined, ReloadOutlined, FilePdfOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PDFDocument } from 'pdf-lib'

export default function PdfToJpgPage() {
  const { t } = useTranslation()
  const [pdfFile, setPdfFile] = useState(null)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [quality, setQuality] = useState(90)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) setPdfFile(accepted[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'application/pdf': ['.pdf'] }, maxFiles: 1
  })

  const convert = async () => {
    if (!pdfFile) return
    setLoading(true)
    setImages([])
    setProgress(0)
    try {
      // Load pdf.js from CDN
      if (!window.pdfjsLib) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
      }

      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const totalPages = pdf.numPages
      const results = []

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2.0 })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')
        await page.render({ canvasContext: ctx, viewport }).promise
        results.push({ url: canvas.toDataURL('image/jpeg', quality / 100), page: i })
        setProgress(Math.round((i / totalPages) * 100))
      }

      setImages(results)
      message.success(`Converted ${totalPages} page(s) successfully!`)
    } catch (err) {
      message.error('Failed to convert PDF. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const downloadAll = () => {
    images.forEach(({ url, page }) => {
      const a = document.createElement('a')
      a.href = url
      a.download = `page-${page}.jpg`
      a.click()
    })
  }

  const reset = () => { setPdfFile(null); setImages([]); setProgress(0) }

  return (
    <div className="tool-page">
      <div className="container">
        <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, display: 'block' }}>
          {t('common.backHome')}
        </Link>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, color: '#ef4444'
            }}>
              <FilePdfOutlined />
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>PDF to JPG Converter</h1>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>
                Convert each page of your PDF into a JPG image — all in your browser
              </p>
            </div>
          </div>
        </div>

        <div className="tool-panel">
          {/* Left: Upload + Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Drop zone */}
            <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <FilePdfOutlined style={{ fontSize: 48, color: '#ef4444', marginBottom: 16, display: 'block' }} />
              <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
                {pdfFile ? pdfFile.name : t('common.dragDrop')}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                {pdfFile ? `${(pdfFile.size / 1024).toFixed(1)} KB` : 'Supports: PDF'}
              </p>
            </div>

            {/* Quality slider */}
            <div style={{
              background: 'var(--bg-card)', borderRadius: 14, padding: 20,
              border: '1px solid var(--border)'
            }}>
              <h4 style={{ fontWeight: 700, marginBottom: 14 }}>Output Quality: {quality}%</h4>
              <Slider min={10} max={100} value={quality} onChange={setQuality}
                styles={{ track: { background: '#ef4444' } }} />
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                Higher quality = larger file size
              </p>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <Button
                type="primary" size="large" onClick={convert}
                disabled={!pdfFile || loading}
                style={{ flex: 1, borderRadius: 10, height: 46, fontWeight: 700 }}
                icon={<UploadOutlined />}
              >
                {loading ? t('common.processing') : 'Convert to JPG'}
              </Button>
              <Button size="large" onClick={reset} icon={<ReloadOutlined />}
                style={{ borderRadius: 10, height: 46 }} />
            </div>

            {loading && <Progress percent={progress} strokeColor="#ef4444" />}
          </div>

          {/* Right: Preview */}
          <div style={{
            background: 'var(--surface)', borderRadius: 16,
            padding: 20, border: '1px solid var(--border)',
            minHeight: 300, maxHeight: 600, overflowY: 'auto'
          }}>
            <h4 style={{ fontWeight: 700, marginBottom: 16 }}>
              {t('common.preview')} {images.length > 0 ? `(${images.length} pages)` : ''}
            </h4>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
                <Spin size="large" />
              </div>
            ) : images.length > 0 ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {images.map(({ url, page }) => (
                    <div key={page} style={{ position: 'relative' }}>
                      <img src={url} alt={`Page ${page}`}
                        style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border)' }} />
                      <span style={{
                        position: 'absolute', bottom: 6, right: 6,
                        background: 'rgba(0,0,0,0.7)', color: '#fff',
                        fontSize: 11, padding: '2px 8px', borderRadius: 6
                      }}>
                        Page {page}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  type="primary" block icon={<DownloadOutlined />}
                  onClick={downloadAll} size="large"
                  style={{ marginTop: 16, borderRadius: 10, height: 46, fontWeight: 700 }}
                >
                  {t('common.download')} All ({images.length} JPGs)
                </Button>
              </>
            ) : (
              <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--text-muted)' }}>
                <FilePdfOutlined style={{ fontSize: 48, marginBottom: 12, display: 'block' }} />
                Upload a PDF to see preview
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
