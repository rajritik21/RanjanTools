import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, message, Progress } from 'antd'
import { DownloadOutlined, ReloadOutlined, MergeCellsOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PDFDocument } from 'pdf-lib'

export default function PdfMergerPage() {
  const { t } = useTranslation()
  const [files, setFiles] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mode, setMode] = useState('pdf') // 'pdf' or 'images'

  const onDropPdf = useCallback((accepted) => {
    setFiles(prev => [...prev, ...accepted])
  }, [])

  const onDropImages = useCallback((accepted) => {
    setImageFiles(prev => [...prev, ...accepted.map(f => ({
      file: f,
      preview: URL.createObjectURL(f)
    }))])
  }, [])

  const { getRootProps: getPdfProps, getInputProps: getPdfInput, isDragActive: isPdfActive } =
    useDropzone({ onDrop: onDropPdf, accept: { 'application/pdf': ['.pdf'] }, multiple: true })

  const { getRootProps: getImgProps, getInputProps: getImgInput, isDragActive: isImgActive } =
    useDropzone({ onDrop: onDropImages, accept: { 'image/*': [] }, multiple: true })

  const mergePdfs = async () => {
    if (files.length < 2) { message.warning('Please upload at least 2 PDFs to merge.'); return }
    setLoading(true); setProgress(0)
    try {
      const merged = await PDFDocument.create()
      for (let i = 0; i < files.length; i++) {
        const ab = await files[i].arrayBuffer()
        const pdf = await PDFDocument.load(ab)
        const pages = await merged.copyPages(pdf, pdf.getPageIndices())
        pages.forEach(p => merged.addPage(p))
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }
      const pdfBytes = await merged.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'merged.pdf'; a.click()
      message.success(`Merged ${files.length} PDFs successfully!`)
    } catch { message.error('Failed to merge PDFs.') }
    finally { setLoading(false) }
  }

  const imagesToPdf = async () => {
    if (imageFiles.length === 0) { message.warning('Please upload at least one image.'); return }
    setLoading(true); setProgress(0)
    try {
      const pdfDoc = await PDFDocument.create()
      for (let i = 0; i < imageFiles.length; i++) {
        const { file } = imageFiles[i]
        const ab = await file.arrayBuffer()
        let img
        if (file.type === 'image/png') img = await pdfDoc.embedPng(ab)
        else img = await pdfDoc.embedJpg(ab)
        const page = pdfDoc.addPage([img.width, img.height])
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
        setProgress(Math.round(((i + 1) / imageFiles.length) * 100))
      }
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'images.pdf'; a.click()
      message.success('Images converted to PDF!')
    } catch { message.error('Failed to convert images.') }
    finally { setLoading(false) }
  }

  return (
    <div className="tool-page">
      <div className="container">
        <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, display: 'block' }}>
          {t('common.backHome')}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #f0f4ff, #e0e7ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, color: '#5b6af5'
          }}><MergeCellsOutlined /></div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>PDF Merger & Converter</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>
              Merge multiple PDFs or convert images to PDF
            </p>
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {[{ key: 'pdf', label: '📄 Merge PDFs' }, { key: 'images', label: '🖼️ Images → PDF' }].map(m => (
            <button key={m.key} onClick={() => setMode(m.key)} style={{
              padding: '10px 22px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 14,
              border: '2px solid',
              borderColor: mode === m.key ? '#5b6af5' : 'var(--border)',
              background: mode === m.key ? 'rgba(91,106,245,0.1)' : 'var(--bg-card)',
              color: mode === m.key ? '#5b6af5' : 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}>{m.label}</button>
          ))}
        </div>

        {mode === 'pdf' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getPdfProps()} className={`upload-zone ${isPdfActive ? 'active' : ''}`}>
              <input {...getPdfInput()} />
              <MergeCellsOutlined style={{ fontSize: 48, color: '#5b6af5', marginBottom: 16, display: 'block' }} />
              <p style={{ fontWeight: 600, fontSize: 16 }}>Drop multiple PDFs here</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{files.length} file(s) selected</p>
            </div>

            {files.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {files.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 16px', background: 'var(--bg-card)',
                    borderRadius: 10, border: '1px solid var(--border)'
                  }}>
                    <span style={{ fontSize: 14 }}>📄 {f.name}</span>
                    <Button type="text" danger size="small"
                      onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                      icon={<DeleteOutlined />} />
                  </div>
                ))}
              </div>
            )}

            {loading && <Progress percent={progress} strokeColor="#5b6af5" />}
            <div style={{ display: 'flex', gap: 12 }}>
              <Button type="primary" size="large" loading={loading} onClick={mergePdfs}
                disabled={files.length < 2}
                style={{ flex: 1, borderRadius: 10, height: 46, fontWeight: 700 }}
                icon={<DownloadOutlined />}>
                Merge {files.length} PDFs
              </Button>
              <Button size="large" onClick={() => setFiles([])} icon={<ReloadOutlined />}
                style={{ borderRadius: 10, height: 46 }} />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getImgProps()} className={`upload-zone ${isImgActive ? 'active' : ''}`}>
              <input {...getImgInput()} />
              <MergeCellsOutlined style={{ fontSize: 48, color: '#5b6af5', marginBottom: 16, display: 'block' }} />
              <p style={{ fontWeight: 600, fontSize: 16 }}>Drop images here (JPG, PNG, WEBP)</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{imageFiles.length} image(s) selected</p>
            </div>

            {imageFiles.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                {imageFiles.map((f, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={f.preview} alt=""
                      style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border)' }} />
                    <button onClick={() => setImageFiles(prev => prev.filter((_, j) => j !== i))}
                      style={{
                        position: 'absolute', top: 3, right: 3, width: 20, height: 20,
                        borderRadius: '50%', background: '#ef4444', color: '#fff',
                        border: 'none', cursor: 'pointer', fontSize: 11, display: 'flex',
                        alignItems: 'center', justifyContent: 'center'
                      }}>✕</button>
                  </div>
                ))}
              </div>
            )}

            {loading && <Progress percent={progress} strokeColor="#5b6af5" />}
            <div style={{ display: 'flex', gap: 12 }}>
              <Button type="primary" size="large" loading={loading} onClick={imagesToPdf}
                disabled={imageFiles.length === 0}
                style={{ flex: 1, borderRadius: 10, height: 46, fontWeight: 700 }}
                icon={<DownloadOutlined />}>
                Convert to PDF
              </Button>
              <Button size="large" onClick={() => setImageFiles([])} icon={<ReloadOutlined />}
                style={{ borderRadius: 10, height: 46 }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
