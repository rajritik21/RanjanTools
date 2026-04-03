import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Slider, Select, ColorPicker, message } from 'antd'
import { DownloadOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function ProfilePicturePage() {
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [outputUrl, setOutputUrl] = useState(null)
  const [borderSize, setBorderSize] = useState(6)
  const [borderColor, setBorderColor] = useState('#5b6af5')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [size, setSize] = useState(300)

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
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')

      // Background
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, size, size)

      // Circle clip
      const center = size / 2
      const radius = center - borderSize
      ctx.save()
      ctx.beginPath()
      ctx.arc(center, center, radius, 0, Math.PI * 2)
      ctx.clip()

      // Draw image (cover crop)
      const scale = Math.max(size / img.width, size / img.height)
      const w = img.width * scale
      const h = img.height * scale
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h)
      ctx.restore()

      // Border circle
      if (borderSize > 0) {
        ctx.strokeStyle = borderColor
        ctx.lineWidth = borderSize
        ctx.beginPath()
        ctx.arc(center, center, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      setOutputUrl(canvas.toDataURL('image/png'))
      message.success('Profile picture created!')
    }
    img.src = preview
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = outputUrl
    a.download = 'profile-picture.png'
    a.click()
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
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, color: '#ec4899'
          }}><UserOutlined /></div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Profile Picture Maker</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>
              Create round profile pictures with custom border & background
            </p>
          </div>
        </div>

        <div className="tool-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <UserOutlined style={{ fontSize: 48, color: '#ec4899', marginBottom: 16, display: 'block' }} />
              <p style={{ fontWeight: 600, fontSize: 16 }}>{file ? file.name : t('common.dragDrop')}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Any image format</p>
            </div>

            <div style={{ background: 'var(--bg-card)', borderRadius: 14, padding: 20, border: '1px solid var(--border)' }}>
              <h4 style={{ fontWeight: 700, marginBottom: 16 }}>Customization</h4>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>
                  Output Size: {size}×{size} px
                </label>
                <Slider min={100} max={600} step={50} value={size} onChange={setSize}
                  marks={{ 100: '100', 300: '300', 600: '600' }} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>
                  Border Size: {borderSize}px
                </label>
                <Slider min={0} max={20} value={borderSize} onChange={setBorderSize} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Border Color</label>
                  <ColorPicker value={borderColor}
                    onChange={(_, hex) => setBorderColor(hex)}
                    showText style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>Background</label>
                  <ColorPicker value={bgColor}
                    onChange={(_, hex) => setBgColor(hex)}
                    showText style={{ width: '100%' }} />
                </div>
              </div>

              {/* Quick BG presets */}
              <div style={{ marginTop: 14 }}>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>Quick colors</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['#ffffff', '#f0f4ff', '#fff7ed', '#f0fdf4', '#fdf2f8', '#000000'].map(c => (
                    <div key={c} onClick={() => setBgColor(c)}
                      style={{
                        width: 28, height: 28, borderRadius: '50%', background: c,
                        border: bgColor === c ? '3px solid #5b6af5' : '2px solid var(--border)',
                        cursor: 'pointer'
                      }} />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <Button type="primary" size="large" onClick={generate}
                disabled={!file}
                style={{ flex: 1, borderRadius: 10, height: 46, fontWeight: 700, background: '#ec4899', borderColor: '#ec4899' }}>
                Create Profile Picture
              </Button>
              <Button size="large" onClick={() => { setFile(null); setPreview(null); setOutputUrl(null) }}
                icon={<ReloadOutlined />} style={{ borderRadius: 10, height: 46 }} />
            </div>

            {outputUrl && (
              <Button size="large" icon={<DownloadOutlined />} onClick={download}
                style={{ borderRadius: 10, height: 46, fontWeight: 700, background: '#22c55e', color: '#fff', border: 'none' }}>
                {t('common.download')} Profile Picture
              </Button>
            )}
          </div>

          <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 20, border: '1px solid var(--border)', minHeight: 300 }}>
            <h4 style={{ fontWeight: 700, marginBottom: 16 }}>{t('common.preview')}</h4>
            {outputUrl ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <img src={outputUrl} alt="Profile"
                  style={{ width: 220, height: 220, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 8px 30px rgba(236,72,153,0.3)' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{size}×{size} px PNG</p>
              </div>
            ) : preview ? (
              <img src={preview} alt="Original"
                style={{ width: '100%', borderRadius: 10, border: '1px solid var(--border)', objectFit: 'cover', maxHeight: 280 }} />
            ) : (
              <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--text-muted)' }}>
                <UserOutlined style={{ fontSize: 48, marginBottom: 12, display: 'block' }} />
                Upload your photo to begin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
