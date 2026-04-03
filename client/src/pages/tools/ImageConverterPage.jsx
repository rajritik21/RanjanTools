import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Segmented, message } from 'antd'
import { DownloadOutlined, ReloadOutlined, PictureOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const FORMATS = [
  { label: 'JPG', value: 'image/jpeg', ext: 'jpg' },
  { label: 'PNG', value: 'image/png', ext: 'png' },
  { label: 'WEBP', value: 'image/webp', ext: 'webp' },
]

export default function ImageConverterPage() {
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [outputUrl, setOutputUrl] = useState(null)
  const [targetFormat, setTargetFormat] = useState('image/png')
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((accepted) => {
    const f = accepted[0]
    if (!f) return
    setFile(f); setOutputUrl(null)
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target.result)
    reader.readAsDataURL(f)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, maxFiles: 1
  })

  const convert = () => {
    if (!preview) return
    setLoading(true)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx.drawImage(img, 0, 0)
      const fmt = FORMATS.find(f => f.value === targetFormat)
      setOutputUrl(canvas.toDataURL(targetFormat, 0.95))
      setLoading(false)
      message.success(`Converted to ${fmt.label}!`)
    }
    img.onerror = () => { setLoading(false); message.error('Failed to load image.') }
    img.src = preview
  }

  const download = () => {
    const fmt = FORMATS.find(f => f.value === targetFormat)
    const base = file.name.replace(/\.[^.]+$/, '')
    const a = document.createElement('a')
    a.href = outputUrl
    a.download = `${base}.${fmt.ext}`
    a.click()
  }

  const getInputFormat = () => {
    if (!file) return '-'
    return file.type.split('/')[1]?.toUpperCase() || '-'
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
            background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, color: '#0ea5e9'
          }}><PictureOutlined /></div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Image Converter</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>
              Convert between JPG, PNG and WEBP formats instantly
            </p>
          </div>
        </div>

        <div className="tool-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <PictureOutlined style={{ fontSize: 48, color: '#0ea5e9', marginBottom: 16, display: 'block' }} />
              <p style={{ fontWeight: 600, fontSize: 16 }}>{file ? file.name : t('common.dragDrop')}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>JPG, PNG, WEBP, GIF, BMP</p>
            </div>

            <div style={{ background: 'var(--bg-card)', borderRadius: 14, padding: 20, border: '1px solid var(--border)' }}>
              <h4 style={{ fontWeight: 700, marginBottom: 16 }}>Convert to Format</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{
                  flex: 1, padding: '10px 16px', background: 'var(--surface)',
                  borderRadius: 10, textAlign: 'center', fontWeight: 700, color: '#0ea5e9'
                }}>
                  {getInputFormat()}
                </div>
                <span style={{ fontSize: 20, color: 'var(--text-muted)' }}>→</span>
                <div style={{ flex: 1 }}>
                  <Segmented
                    value={targetFormat}
                    onChange={setTargetFormat}
                    options={FORMATS.map(f => ({ label: f.label, value: f.value }))}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
              <div style={{ padding: 12, background: 'rgba(14,165,233,0.06)', borderRadius: 10, border: '1px solid rgba(14,165,233,0.15)' }}>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
                  {targetFormat === 'image/jpeg' && '💡 JPG: Best for photos, smaller file size. No transparency.'}
                  {targetFormat === 'image/png' && '💡 PNG: Supports transparency. Perfect for logos and graphics.'}
                  {targetFormat === 'image/webp' && '💡 WEBP: Modern format with best compression. Supported in all modern browsers.'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <Button type="primary" size="large" onClick={convert} loading={loading}
                disabled={!file}
                style={{ flex: 1, borderRadius: 10, height: 46, fontWeight: 700, background: '#0ea5e9', borderColor: '#0ea5e9' }}>
                Convert Image
              </Button>
              <Button size="large" onClick={() => { setFile(null); setPreview(null); setOutputUrl(null) }}
                icon={<ReloadOutlined />} style={{ borderRadius: 10, height: 46 }} />
            </div>

            {outputUrl && (
              <Button size="large" icon={<DownloadOutlined />} onClick={download}
                style={{ borderRadius: 10, height: 46, fontWeight: 700, background: '#22c55e', color: '#fff', border: 'none' }}>
                {t('common.download')} {FORMATS.find(f => f.value === targetFormat)?.label}
              </Button>
            )}
          </div>

          <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 20, border: '1px solid var(--border)', minHeight: 300 }}>
            <h4 style={{ fontWeight: 700, marginBottom: 16 }}>{t('common.preview')}</h4>
            {outputUrl ? (
              <div>
                <p style={{ fontSize: 12, color: '#22c55e', marginBottom: 6 }}>✓ Converted</p>
                <img src={outputUrl} alt="Converted"
                  style={{ width: '100%', borderRadius: 10, border: '2px solid #22c55e', maxHeight: 300, objectFit: 'contain' }} />
              </div>
            ) : preview ? (
              <img src={preview} alt="Original"
                style={{ width: '100%', borderRadius: 10, border: '1px solid var(--border)', maxHeight: 300, objectFit: 'contain' }} />
            ) : (
              <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--text-muted)' }}>
                <PictureOutlined style={{ fontSize: 48, marginBottom: 12, display: 'block' }} />
                Upload an image to convert
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
