import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, InputNumber, Select, message, Segmented } from 'antd'
import { DownloadOutlined, ReloadOutlined, ExpandOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const CM_TO_PX = 37.7952755906
const MM_TO_PX = 3.77952755906

export default function ImageResizerPage() {
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [outputUrl, setOutputUrl] = useState(null)
  const [unit, setUnit] = useState('px')
  const [width, setWidth] = useState(200)
  const [height, setHeight] = useState(200)
  const [keepAspect, setKeepAspect] = useState(true)
  const [origSize, setOrigSize] = useState({ w: 0, h: 0 })

  const onDrop = useCallback((accepted) => {
    const f = accepted[0]
    if (!f) return
    setFile(f); setOutputUrl(null)
    const reader = new FileReader()
    reader.onload = e => {
      setPreview(e.target.result)
      const img = new Image()
      img.onload = () => {
        setOrigSize({ w: img.width, h: img.height })
        setWidth(img.width); setHeight(img.height)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(f)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, maxFiles: 1
  })

  const toPx = (val) => {
    if (unit === 'cm') return Math.round(val * CM_TO_PX)
    if (unit === 'mm') return Math.round(val * MM_TO_PX)
    return val
  }

  const handleWidthChange = (val) => {
    setWidth(val)
    if (keepAspect && origSize.w && origSize.h) {
      setHeight(Math.round(val * origSize.h / origSize.w))
    }
  }

  const resize = () => {
    if (!preview) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = toPx(width)
      canvas.height = toPx(height)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, toPx(width), toPx(height))
      setOutputUrl(canvas.toDataURL('image/jpeg', 0.95))
      message.success(`Resized to ${toPx(width)}×${toPx(height)} px!`)
    }
    img.src = preview
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
            background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, color: '#8b5cf6'
          }}><ExpandOutlined /></div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Custom Image Resizer</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>
              Resize to exact px, cm, or mm — no quality loss
            </p>
          </div>
        </div>

        <div className="tool-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <ExpandOutlined style={{ fontSize: 48, color: '#8b5cf6', marginBottom: 16, display: 'block' }} />
              <p style={{ fontWeight: 600, fontSize: 16 }}>{file ? file.name : t('common.dragDrop')}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>JPG, PNG, WEBP</p>
            </div>

            {/* Options */}
            <div style={{ background: 'var(--bg-card)', borderRadius: 14, padding: 20, border: '1px solid var(--border)' }}>
              <h4 style={{ fontWeight: 700, marginBottom: 16 }}>Resize Options</h4>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Unit</label>
                <Segmented
                  value={unit} onChange={setUnit}
                  options={['px', 'cm', 'mm']}
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Width ({unit})</label>
                  <InputNumber min={1} max={10000} value={width} onChange={handleWidthChange}
                    style={{ width: '100%' }} size="large" />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Height ({unit})</label>
                  <InputNumber min={1} max={10000} value={height} onChange={setHeight}
                    style={{ width: '100%' }} size="large" />
                </div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" id="aspect" checked={keepAspect}
                  onChange={e => setKeepAspect(e.target.checked)} />
                <label htmlFor="aspect" style={{ fontSize: 13 }}>Lock aspect ratio</label>
              </div>
              {origSize.w > 0 && (
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                  Original: {origSize.w} × {origSize.h} px
                </p>
              )}
            </div>

            {/* Common Presets */}
            <div style={{ background: 'var(--bg-card)', borderRadius: 14, padding: 16, border: '1px solid var(--border)' }}>
              <h4 style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Quick Presets</h4>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { label: 'SSC (3.5×4.5cm)', w: 3.5, h: 4.5, u: 'cm' },
                  { label: 'Passport (35×45mm)', w: 35, h: 45, u: 'mm' },
                  { label: '200×230 px', w: 200, h: 230, u: 'px' },
                  { label: '100×100 px', w: 100, h: 100, u: 'px' },
                ].map(p => (
                  <button key={p.label}
                    onClick={() => { setUnit(p.u); setWidth(p.w); setHeight(p.h); setKeepAspect(false) }}
                    style={{
                      padding: '5px 12px', borderRadius: 8,
                      border: '1.5px solid var(--border)',
                      background: 'transparent', cursor: 'pointer',
                      fontSize: 12, fontWeight: 600, color: '#8b5cf6'
                    }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <Button type="primary" size="large" onClick={resize}
                disabled={!file} style={{ flex: 1, borderRadius: 10, height: 46, fontWeight: 700 }}>
                Resize Image
              </Button>
              <Button size="large" onClick={() => { setFile(null); setPreview(null); setOutputUrl(null) }}
                icon={<ReloadOutlined />} style={{ borderRadius: 10, height: 46 }} />
            </div>

            {outputUrl && (
              <Button size="large" icon={<DownloadOutlined />}
                onClick={() => { const a = document.createElement('a'); a.href = outputUrl; a.download = 'resized.jpg'; a.click() }}
                style={{ borderRadius: 10, height: 46, fontWeight: 700, background: '#22c55e', color: '#fff', border: 'none' }}>
                {t('common.download')} Resized Image
              </Button>
            )}
          </div>

          <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 20, border: '1px solid var(--border)', minHeight: 300 }}>
            <h4 style={{ fontWeight: 700, marginBottom: 16 }}>{t('common.preview')}</h4>
            {preview ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <img src={preview} alt="Original"
                  style={{ width: '100%', borderRadius: 10, border: '1px solid var(--border)', objectFit: 'contain', maxHeight: 220 }} />
                {outputUrl && (
                  <div>
                    <p style={{ fontSize: 12, color: '#22c55e', marginBottom: 6 }}>✓ Resized — {toPx(width)}×{toPx(height)} px</p>
                    <img src={outputUrl} alt="Resized"
                      style={{ width: '100%', borderRadius: 10, border: '2px solid #22c55e', objectFit: 'contain', maxHeight: 220 }} />
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--text-muted)' }}>
                <ExpandOutlined style={{ fontSize: 48, marginBottom: 12, display: 'block' }} />
                Upload an image to get started
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
