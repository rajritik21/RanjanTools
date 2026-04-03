import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, message } from 'antd'
import { DownloadOutlined, ReloadOutlined, RetweetOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function JpgToPngPage() {
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [outputUrl, setOutputUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((accepted) => {
    const f = accepted[0]
    if (!f) return
    setFile(f)
    setOutputUrl(null)
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target.result)
    reader.readAsDataURL(f)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/jpeg': ['.jpg', '.jpeg'] }, maxFiles: 1
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
      ctx.drawImage(img, 0, 0)
      setOutputUrl(canvas.toDataURL('image/png'))
      setLoading(false)
      message.success('Converted to PNG successfully!')
    }
    img.src = preview
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = outputUrl
    a.download = file.name.replace(/\.(jpg|jpeg)$/i, '.png')
    a.click()
  }

  const reset = () => { setFile(null); setPreview(null); setOutputUrl(null) }

  return (
    <div className="tool-page">
      <div className="container">
        <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, display: 'block' }}>
          {t('common.backHome')}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, color: '#3b82f6'
          }}>
            <RetweetOutlined />
          </div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>JPG to PNG Converter</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>
              Losslessly convert JPG images to transparent PNG format
            </p>
          </div>
        </div>

        <div className="tool-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <RetweetOutlined style={{ fontSize: 48, color: '#3b82f6', marginBottom: 16, display: 'block' }} />
              <p style={{ fontWeight: 600, fontSize: 16 }}>
                {file ? file.name : t('common.dragDrop')}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                {file ? `${(file.size / 1024).toFixed(1)} KB` : 'Supports: JPG, JPEG'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <Button type="primary" size="large" onClick={convert}
                disabled={!file || loading} loading={loading}
                style={{ flex: 1, borderRadius: 10, height: 46, fontWeight: 700 }}>
                Convert to PNG
              </Button>
              <Button size="large" onClick={reset} icon={<ReloadOutlined />}
                style={{ borderRadius: 10, height: 46 }} />
            </div>

            {outputUrl && (
              <Button
                size="large" icon={<DownloadOutlined />} onClick={download}
                style={{
                  borderRadius: 10, height: 46, fontWeight: 700,
                  background: '#22c55e', color: '#fff', border: 'none'
                }}
              >
                {t('common.download')} PNG
              </Button>
            )}
          </div>

          <div style={{
            background: 'var(--surface)', borderRadius: 16,
            padding: 20, border: '1px solid var(--border)', minHeight: 300
          }}>
            <h4 style={{ fontWeight: 700, marginBottom: 16 }}>{t('common.preview')}</h4>
            {preview ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Original JPG</p>
                  <img src={preview} alt="Original"
                    style={{ width: '100%', borderRadius: 10, border: '1px solid var(--border)' }} />
                </div>
                {outputUrl && (
                  <div>
                    <p style={{ fontSize: 12, color: '#22c55e', marginBottom: 6 }}>✓ Converted PNG</p>
                    <img src={outputUrl} alt="Converted"
                      style={{ width: '100%', borderRadius: 10, border: '2px solid #22c55e' }} />
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--text-muted)' }}>
                <RetweetOutlined style={{ fontSize: 48, marginBottom: 12, display: 'block' }} />
                Upload a JPG to preview
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
