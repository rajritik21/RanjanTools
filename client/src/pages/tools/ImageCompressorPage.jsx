import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, InputNumber, Slider, message, Progress, Statistic } from 'antd'
import { DownloadOutlined, ReloadOutlined, CompressOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function ImageCompressorPage() {
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [outputUrl, setOutputUrl] = useState(null)
  const [targetKB, setTargetKB] = useState(50)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState(null)

  const onDrop = useCallback((accepted) => {
    const f = accepted[0]
    if (!f) return
    setFile(f); setOutputUrl(null); setStats(null)
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target.result)
    reader.readAsDataURL(f)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, maxFiles: 1
  })

  const compressToTargetKB = (img, targetBytes, quality = 0.9, attempts = 0) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width; canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      const tryCompress = (q) => {
        canvas.toBlob((blob) => {
          if (!blob) { resolve({ url: canvas.toDataURL('image/jpeg', 0.1), size: 0 }); return }
          if (blob.size <= targetBytes || q <= 0.01) {
            const url = URL.createObjectURL(blob)
            resolve({ url, blob, size: blob.size })
          } else {
            const newQ = q - 0.05
            tryCompress(Math.max(newQ, 0.01))
          }
        }, 'image/jpeg', q)
      }
      tryCompress(quality)
    })
  }

  const compress = async () => {
    if (!preview || !file) return
    setLoading(true)
    try {
      const img = new Image()
      img.src = preview
      await new Promise(resolve => { img.onload = resolve })

      const targetBytes = targetKB * 1024
      const origKB = Math.round(file.size / 1024)

      const { url, blob, size } = await compressToTargetKB(img, targetBytes)
      if (!url) throw new Error('Compression failed')

      const resultKB = Math.round(size / 1024)
      setOutputUrl(url)
      setStats({ origKB, resultKB, reduction: Math.round((1 - size / file.size) * 100) })
      message.success(`Compressed from ${origKB}KB → ${resultKB}KB`)
    } catch {
      message.error('Compression failed. Try a higher target size.')
    } finally {
      setLoading(false)
    }
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = outputUrl
    a.download = `compressed-${file.name.replace(/\.[^.]+$/, '')}.jpg`
    a.click()
  }

  const PRESETS = [20, 50, 100, 200, 500]

  return (
    <div className="tool-page">
      <div className="container">
        <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, display: 'block' }}>
          {t('common.backHome')}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, color: '#22c55e'
          }}><CompressOutlined /></div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Image Compressor</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>
              Compress to exact KB — 20KB, 50KB, 100KB — maintain quality
            </p>
          </div>
        </div>

        <div className="tool-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'active' : ''}`}>
              <input {...getInputProps()} />
              <CompressOutlined style={{ fontSize: 48, color: '#22c55e', marginBottom: 16, display: 'block' }} />
              <p style={{ fontWeight: 600, fontSize: 16 }}>{file ? file.name : t('common.dragDrop')}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                {file ? `Original: ${Math.round(file.size / 1024)}KB` : 'JPG, PNG, WEBP'}
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', borderRadius: 14, padding: 20, border: '1px solid var(--border)' }}>
              <h4 style={{ fontWeight: 700, marginBottom: 16 }}>Target Size</h4>

              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>
                  Target file size (KB): <strong style={{ color: '#22c55e' }}>{targetKB} KB</strong>
                </label>
                <Slider min={5} max={2000} value={targetKB} onChange={setTargetKB}
                  marks={{ 20: '20KB', 50: '50KB', 100: '100KB', 500: '500KB' }}
                  styles={{ track: { background: '#22c55e' } }} />
              </div>

              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>Quick Presets</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {PRESETS.map(kb => (
                    <button key={kb} onClick={() => setTargetKB(kb)} style={{
                      padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 700,
                      fontSize: 13, border: '2px solid',
                      borderColor: targetKB === kb ? '#22c55e' : 'var(--border)',
                      background: targetKB === kb ? 'rgba(34,197,94,0.1)' : 'transparent',
                      color: targetKB === kb ? '#22c55e' : 'var(--text-secondary)',
                      transition: 'all 0.2s'
                    }}>
                      {kb}KB
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            {stats && (
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                gap: 12, background: 'var(--bg-card)',
                borderRadius: 14, padding: 16, border: '1px solid var(--border)'
              }}>
                <Statistic title="Original" value={stats.origKB} suffix="KB" />
                <Statistic title="Compressed" value={stats.resultKB} suffix="KB"
                  valueStyle={{ color: '#22c55e' }} />
                <Statistic title="Reduced" value={stats.reduction} suffix="%"
                  valueStyle={{ color: '#f97316' }} />
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <Button type="primary" size="large" loading={loading} onClick={compress}
                disabled={!file}
                style={{ flex: 1, borderRadius: 10, height: 46, fontWeight: 700, background: '#22c55e', borderColor: '#22c55e' }}>
                {loading ? t('common.processing') : `Compress to ${targetKB}KB`}
              </Button>
              <Button size="large" onClick={() => { setFile(null); setPreview(null); setOutputUrl(null); setStats(null) }}
                icon={<ReloadOutlined />} style={{ borderRadius: 10, height: 46 }} />
            </div>

            {outputUrl && (
              <Button size="large" icon={<DownloadOutlined />} onClick={download}
                style={{ borderRadius: 10, height: 46, fontWeight: 700, background: '#5b6af5', color: '#fff', border: 'none' }}>
                {t('common.download')} Compressed Image
              </Button>
            )}
          </div>

          <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 20, border: '1px solid var(--border)', minHeight: 300 }}>
            <h4 style={{ fontWeight: 700, marginBottom: 16 }}>{t('common.preview')}</h4>
            {outputUrl ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Original ({stats?.origKB}KB)</p>
                  <img src={preview} alt="Original"
                    style={{ width: '100%', borderRadius: 10, border: '1px solid var(--border)', maxHeight: 180, objectFit: 'contain' }} />
                </div>
                <div>
                  <p style={{ fontSize: 12, color: '#22c55e', marginBottom: 6 }}>✓ Compressed ({stats?.resultKB}KB) — {stats?.reduction}% saved</p>
                  <img src={outputUrl} alt="Compressed"
                    style={{ width: '100%', borderRadius: 10, border: '2px solid #22c55e', maxHeight: 180, objectFit: 'contain' }} />
                </div>
              </div>
            ) : preview ? (
              <img src={preview} alt="Original"
                style={{ width: '100%', borderRadius: 10, border: '1px solid var(--border)', maxHeight: 300, objectFit: 'contain' }} />
            ) : (
              <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--text-muted)' }}>
                <CompressOutlined style={{ fontSize: 48, marginBottom: 12, display: 'block' }} />
                Upload an image to compress
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
