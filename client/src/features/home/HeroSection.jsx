import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircleFilled, LockFilled, ThunderboltFilled,
  ArrowRightOutlined, DownOutlined
} from '@ant-design/icons'

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 8,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 4
}))

export default function HeroSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section style={{
      position: 'relative',
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'var(--bg-hero)',
      marginTop: -64,
      paddingTop: 64,
    }}>
      {/* Animated background particles */}
      {PARTICLES.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          width: p.size, height: p.size,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          left: `${p.left}%`,
          top: `${p.top}%`,
          animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}

      {/* Glow blobs */}
      <div style={{
        position: 'absolute', width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91,106,245,0.3) 0%, transparent 70%)',
        top: '10%', right: '-10%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)',
        bottom: '10%', left: '-5%', pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '80px 24px' }}>

        {/* Eyebrow badge */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 999,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', fontSize: 13, fontWeight: 600
          }}>
            <ThunderboltFilled style={{ color: '#fbbf24' }} />
            100% Free · No Upload Required · Privacy Safe
          </span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: 24,
          textShadow: '0 2px 20px rgba(0,0,0,0.3)'
        }}>
          {t('hero.tagline')}
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: 'clamp(15px, 2.5vw, 19px)',
          color: 'rgba(255,255,255,0.82)',
          maxWidth: 640,
          margin: '0 auto 40px',
          lineHeight: 1.7
        }}>
          {t('hero.sub')}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
          <button
            onClick={() => { document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 36px',
              background: '#fff', color: '#5b6af5',
              border: 'none', borderRadius: 14,
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
              transition: 'all 0.25s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)' }}
          >
            {t('hero.cta')} <ArrowRightOutlined />
          </button>
          <button
            onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 36px',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.35)',
              borderRadius: 14,
              fontSize: 16, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.25s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
          >
            {t('hero.cta2')}
          </button>
        </div>

        {/* Trust Badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 60 }}>
          {[
            { icon: <CheckCircleFilled style={{ color: '#22c55e' }} />, label: t('badges.free'), color: '#22c55e' },
            { icon: <LockFilled style={{ color: '#60a5fa' }} />, label: t('badges.noUpload'), color: '#60a5fa' },
            { icon: <ThunderboltFilled style={{ color: '#f97316' }} />, label: t('badges.privacy'), color: '#f97316' },
          ].map(b => (
            <div key={b.label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 18px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${b.color}55`,
              borderRadius: 999,
              color: '#fff', fontSize: 13, fontWeight: 600
            }}>
              {b.icon} {b.label}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500,
          animation: 'float 2s ease-in-out infinite'
        }}>
          <span>Scroll to explore</span>
          <DownOutlined />
        </div>
      </div>
    </section>
  )
}
