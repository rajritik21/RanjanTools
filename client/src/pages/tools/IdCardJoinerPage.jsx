import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Select, message } from 'antd'
import { DownloadOutlined, ReloadOutlined, IdcardOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PDFDocument, rgb } from 'pdf-lib'

export default function IdCardJoinerPage() {
  const { t } = useTranslation()
  const [frontFile, setFrontFile] = useState(null)
  const [backFile, setBackFile] = useState(null)
  const [frontPreview, setFrontPreview] = useState(null)
  const [backPreview, setBackPreview] = useState(null)
  const [layout, setLayout] = useState('side-by-side')
  const [loading, setLoading] = useState(false)

  const loadFile = (setter, previewSetter) => (accepted) => {
    const f = accepted[0]
    if (!f) return
    setter(f)
    const reader = new FileReader()
    reader.onload = e => previewSetter(e.target.result)
    reader.readAsDataURL(f)
  }

  const { getRootProps: getFrontProps, getInputProps: getFrontInput, isDragActive: isFrontActive } =
    useDropzone({ onDrop: loadFile(setFrontFile, setFrontPreview), accept: { 'image/*': [] }, maxFiles: 1 })

  const { getRootProps: getBackProps, getInputProps: getBackInput, isDragActive: isBackActive } =
    useDropzone({ onDrop: loadFile(setBackFile, setBackPreview), accept: { 'image/*': [] }, maxFiles: 1 })

  const generate = async () => {
    if (!frontFile || !backFile) { message.warning('Please upload both front and back images.'); return }
    setLoading(true)
    try {
      const pdfDoc = await PDFDocument.create()
      const a4w = 841.89, a4h = 595.28 // A4 landscape in points

      const loadImg = async (file) => {
        const ab = await file.arrayBuffer()
        const mime = file.type
        if (mime === 'image/png') return pdfDoc.embedPng(ab)
        return pdfDoc.embedJpg(ab)
      }

      const frontImg = await loadImg(frontFile)
      const backImg = await loadImg(backFile)

      const page = pdfDoc.addPage([a4w, a4h])
      const margin = 20
      const halfW = (a4w - margin * 3) / 2

      // Draw front
      const fd = frontImg.scaleToFit(halfW, a4h - margin * 2)
      page.drawImage(frontImg, {
        x: margin, y: (a4h - fd.height) / 2,
        width: fd.width, height: fd.height
      })

      // Draw back
      const bd = backImg.scaleToFit(halfW, a4h - margin * 2)
      page.drawImage(backImg, {
        x: margin * 2 + halfW, y: (a4h - bd.height) / 2,
        width: bd.width, height: bd.height
      })

      // Label
      page.drawText('Front', { x: margin, y: 12, size: 10, color: rgb(0.4, 0.4, 0.4) })
      page.drawText('Back', { x: margin * 2 + halfW, y: 12, size: 10, color: rgb(0.4, 0.4, 0.4) })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'id-card.pdf'
      a.click()
      message.success('ID Card PDF created!')
    } catch (err) {
      message.error('Failed to create PDF.')
    } finally {
      setLoading(false)
    }
  }

  const ZoneStyle = (active) => ({
    border: `2px dashed ${active ? '#f97316' : 'var(--border)'}`,
    borderRadius: 12, padding: 24, textAlign: 'center', cursor: 'pointer',
    background: active ? 'rgba(249,115,22,0.05)' : 'var(--surface)',
    transition: 'all 0.25s', flex: 1
  })

  return (
    <div className="tool-page">
      <div className="container">
        <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, display: 'block' }}>
          {t('common.backHome')}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, color: '#f97316'
          }}><IdcardOutlined /></div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>ID Card Joiner</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>
              Merge Aadhaar / ID front & back into one A4 PDF page
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          <div {...getFrontProps()} style={ZoneStyle(isFrontActive)}>
            <input {...getFrontInput()} />
            <IdcardOutlined style={{ fontSize: 36, color: '#f97316', marginBottom: 10, display: 'block' }} />
            <p style={{ fontWeight: 700, marginBottom: 4 }}>📄 Front Side</p>
            {frontPreview
              ? <img src={frontPreview} alt="Front" style={{ width: '100%', maxHeight: 120, objectFit: 'contain', borderRadius: 8, marginTop: 8 }} />
              : <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Upload front of ID</p>}
          </div>

          <div {...getBackProps()} style={ZoneStyle(isBackActive)}>
            <input {...getBackInput()} />
            <IdcardOutlined style={{ fontSize: 36, color: '#f97316', marginBottom: 10, display: 'block' }} />
            <p style={{ fontWeight: 700, marginBottom: 4 }}>📄 Back Side</p>
            {backPreview
              ? <img src={backPreview} alt="Back" style={{ width: '100%', maxHeight: 120, objectFit: 'contain', borderRadius: 8, marginTop: 8 }} />
              : <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Upload back of ID</p>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <Button type="primary" size="large" loading={loading}
            onClick={generate} disabled={!frontFile || !backFile}
            style={{ flex: 1, borderRadius: 10, height: 46, fontWeight: 700, background: '#f97316', borderColor: '#f97316' }}
            icon={<DownloadOutlined />}>
            Generate & Download PDF
          </Button>
          <Button size="large" icon={<ReloadOutlined />}
            onClick={() => { setFrontFile(null); setBackFile(null); setFrontPreview(null); setBackPreview(null) }}
            style={{ borderRadius: 10, height: 46 }} />
        </div>

        <div style={{ marginTop: 20, padding: 16, background: 'rgba(249,115,22,0.06)', borderRadius: 12, border: '1px solid rgba(249,115,22,0.2)' }}>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
            💡 <strong>Tip:</strong> Both images are placed side-by-side on an A4 landscape page — perfect for printing and submitting with forms.
          </p>
        </div>
      </div>
    </div>
  )
}
