import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Input, ColorPicker, Slider, Select, message } from 'antd'
import { DownloadOutlined, ReloadOutlined, CalendarOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function DateOnPhotoPage() {
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [outputUrl, setOutputUrl] = useState(null)
  const [nameText, setNameText] = useState('')
  const [dateText, setDateText] = useState(new Date().toLocaleDateString('en-IN'))
  const [stripColor, setStripColor] = useState('#000000')
  const [textColor, setTextColor] = useState('#ffffff')
  const [position, setPosition] = useState('bottom')
  const [fontSize, setFontSize] = useState(18)

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

  const generate = () => {
    if (!preview) return
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const stripH = fontSize * 3
      canvas.width = img.width
      canvas.height = img.height + stripH
      const ctx = canvas.getContext('2d')

      // Draw original image
      const imgY = position === 'bottom' ? 0 : stripH
      ctx.drawImage(img, 0, imgY, img.width, img.height)

      // Draw strip
      const stripY = position === 'bottom' ? img.height : 0
      ctx.fillStyle = stripColor
      ctx.fillRect(0, stripY, canvas.width, stripH)

      // Draw text
      ctx.fillStyle = textColor
      ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`
      ctx.textAlign = 'left'
      const textY = stripY + stripH / 2 + fontSize * 0.35

      const label = [nameText, dateText].filter(Boolean).join('    |    ')
      ctx.fillText(`  ${label}`, 12, textY)

      setOutputUrl(canvas.toDataURL('image/jpeg', 0.95))
      message.success('Date strip added!')
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
            background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, color: '#14b8a6'
          }}><CalendarOutlined /></div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Date on Photo Tool</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>
              Add name & date strip to photo — for SSC, Railway, and govt forms
            </p>
          </div>
        </div>

        <div className="tool-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <CalendarOutlined style={{ fontSize: 48, color: '#14b8a6', marginBottom: 16, display: 'block' }} />
              <p style={{ fontWeight: 600, fontSize: 16 }}>{file ? file.name : t('common.dragDrop')}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Any image format</p>
            </div>

            <div style={{ background: 'var(--bg-card)', borderRadius: 14, padding: 20, border: '1px solid var(--border)' }}>
              <h4 style={{ fontWeight: 700, marginBottom: 16 }}>Strip Options</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Your Name (optional)</label>
                  <Input value={nameText} onChange={e => setNameText(e.target.value)}
                    placeholder="e.g. Ritik Ranjan" size="large" style={{ borderRadius: 10 }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Date</label>
                  <Input value={dateText} onChange={e => setDateText(e.target.value)}
                    size="large" style={{ borderRadius: 10 }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Position</label>
                  <Select value={position} onChange={setPosition} style={{ width: '100%' }} size="large"
                    options={[{ label: 'Bottom', value: 'bottom' }, { label: 'Top', value: 'top' }]} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Font Size: {fontSize}px</label>
                  <Slider min={10} max={32} value={fontSize} onChange={setFontSize} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Strip Color</label>
                    <ColorPicker value={stripColor} onChange={(_, hex) => setStripColor(hex)} showText />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Text Color</label>
                    <ColorPicker value={textColor} onChange={(_, hex) => setTextColor(hex)} showText />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <Button type="primary" size="large" onClick={generate} disabled={!file}
                style={{ flex: 1, borderRadius: 10, height: 46, fontWeight: 700, background: '#14b8a6', borderColor: '#14b8a6' }}>
                Add Strip to Photo
              </Button>
              <Button size="large" onClick={() => { setFile(null); setPreview(null); setOutputUrl(null) }}
                icon={<ReloadOutlined />} style={{ borderRadius: 10, height: 46 }} />
            </div>
            {outputUrl && (
              <Button size="large" icon={<DownloadOutlined />}
                onClick={() => { const a = document.createElement('a'); a.href = outputUrl; a.download = 'photo-with-date.jpg'; a.click() }}
                style={{ borderRadius: 10, height: 46, fontWeight: 700, background: '#22c55e', color: '#fff', border: 'none' }}>
                {t('common.download')} Photo
              </Button>
            )}
          </div>

          <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 20, border: '1px solid var(--border)', minHeight: 300 }}>
            <h4 style={{ fontWeight: 700, marginBottom: 16 }}>{t('common.preview')}</h4>
            {outputUrl ? (
              <img src={outputUrl} alt="Result"
                style={{ width: '100%', borderRadius: 10, border: '2px solid #14b8a6' }} />
            ) : preview ? (
              <img src={preview} alt="Original"
                style={{ width: '100%', borderRadius: 10, border: '1px solid var(--border)' }} />
            ) : (
              <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--text-muted)' }}>
                <CalendarOutlined style={{ fontSize: 48, marginBottom: 12, display: 'block' }} />
                Upload a photo to begin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
