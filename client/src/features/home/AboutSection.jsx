import React from 'react'
import { useTranslation } from 'react-i18next'
import { RocketOutlined, BookOutlined, HeartOutlined } from '@ant-design/icons'

export default function AboutSection() {
  const { t } = useTranslation()

  return (
    <section id="about" className="section">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center'
        }}>

          {/* Left: Visual Card */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'linear-gradient(135deg, #5b6af5 0%, #764ba2 50%, #f97316 100%)',
              borderRadius: 24,
              padding: 40,
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(91,106,245,0.35)'
            }}>
              {/* Background pattern */}
              <div style={{
                position: 'absolute', top: -40, right: -40,
                width: 200, height: 200, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)'
              }} />
              <div style={{
                position: 'absolute', bottom: -30, left: -30,
                width: 150, height: 150, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)'
              }} />

              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, marginBottom: 20,
                border: '3px solid rgba(255,255,255,0.3)'
              }}>
                👨‍💻
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Ritik Ranjan</h3>
              <p style={{ opacity: 0.85, marginBottom: 20 }}>B.Tech CSE Graduate</p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['🏘️ Village Background', '💻 Full Stack Dev', '❤️ For Students'].map(tag => (
                  <span key={tag} style={{
                    padding: '5px 12px', borderRadius: 999,
                    background: 'rgba(255,255,255,0.15)',
                    fontSize: 12, fontWeight: 600
                  }}>{tag}</span>
                ))}
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 16, marginTop: 28
              }}>
                {[
                  { value: '9+', label: 'Free Tools' },
                  { value: '₹0', label: 'Always Free' },
                  { value: '100%', label: 'Client-Side' },
                  { value: '🔒', label: 'Privacy Safe' },
                ].map(s => (
                  <div key={s.label} style={{
                    background: 'rgba(255,255,255,0.13)',
                    borderRadius: 12, padding: '12px 16px'
                  }}>
                    <div style={{ fontWeight: 800, fontSize: 20 }}>{s.value}</div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Story Text */}
          <div>
            <span style={{
              textTransform: 'uppercase', fontSize: 12, fontWeight: 700,
              letterSpacing: 2, color: '#5b6af5', display: 'block', marginBottom: 12
            }}>
              {t('about.overline')}
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, marginBottom: 24 }}>
              {t('about.title')}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { icon: <BookOutlined />, text: t('about.p1'), color: '#5b6af5' },
                { icon: <HeartOutlined />, text: t('about.p2'), color: '#ef4444' },
                { icon: <RocketOutlined />, text: t('about.p3'), color: '#f97316' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 40, height: 40, minWidth: 40,
                    borderRadius: 12, background: `${item.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: item.color, fontSize: 18, marginTop: 2
                  }}>
                    {item.icon}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 15 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Mission Box */}
            <div style={{
              marginTop: 28,
              padding: '18px 22px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(91,106,245,0.08), rgba(249,115,22,0.08))',
              border: '1.5px solid rgba(91,106,245,0.2)',
            }}>
              <p style={{ fontWeight: 600, fontSize: 16, color: 'var(--text-primary)' }}>
                👉 {t('about.mission')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
