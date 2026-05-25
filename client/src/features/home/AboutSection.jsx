import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  HeartOutlined,
  ThunderboltOutlined,
  DollarOutlined,
  AppstoreOutlined,
  GlobalOutlined,
  StarOutlined,
} from '@ant-design/icons'

export default function AboutSection() {
  const { t } = useTranslation()

  const principles = [
    {
      icon: <DollarOutlined />,
      title: t('about.principleFreeTitle'),
      text: t('about.principleFreeDesc'),
      color: '#10b981',
    },
    {
      icon: <AppstoreOutlined />,
      title: t('about.principleAioTitle'),
      text: t('about.principleAioDesc'),
      color: '#5b6af5',
    },
    {
      icon: <GlobalOutlined />,
      title: t('about.principleSimpleTitle'),
      text: t('about.principleSimpleDesc'),
      color: '#f97316',
    },
  ]

  return (
    <section id="about" className="section">
      <div className="container">

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            textTransform: 'uppercase', fontSize: 12, fontWeight: 700,
            letterSpacing: 2, color: '#5b6af5', display: 'block', marginBottom: 12,
          }}>
            {t('about.overline')}
          </span>
          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800,
            marginBottom: 16, lineHeight: 1.25,
          }}>
            {t('about.title')}
          </h2>
          <p style={{
            maxWidth: 680, margin: '0 auto',
            color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7,
          }}>
            {t('about.intro')}
          </p>
        </div>

        {/* ── Origin Story — full width ── */}
        <div style={{ marginBottom: 56 }}>
          <h3 style={{
            fontSize: 22, fontWeight: 700, marginBottom: 16,
            color: 'var(--text-primary)',
          }}>
            <ThunderboltOutlined style={{ color: '#5b6af5', marginRight: 8 }} />
            {t('about.originTitle')}
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15, marginBottom: 14 }}>
            {t('about.origin1')}
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15 }}>
            {t('about.origin2')}
          </p>
        </div>

        {/* ── The Hidden Struggle ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(239,68,68,0.06), rgba(249,115,22,0.06))',
          border: '1.5px solid rgba(239,68,68,0.15)',
          borderRadius: 20, padding: '36px 40px', marginBottom: 56,
        }}>
          <h3 style={{
            fontSize: 20, fontWeight: 700, marginBottom: 20,
            color: 'var(--text-primary)',
          }}>
            <HeartOutlined style={{ color: '#ef4444', marginRight: 8 }} />
            {t('about.struggleTitle')}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Struggle 1 */}
            <div style={{
              background: 'var(--bg-primary)', borderRadius: 14,
              padding: '20px 24px', border: '1px solid var(--border-color)',
            }}>
              <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 8, color: 'var(--text-primary)' }}>
                🌐 {t('about.struggle1Title')}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                {t('about.struggle1Desc')}
              </p>
            </div>
            {/* Struggle 2 */}
            <div style={{
              background: 'var(--bg-primary)', borderRadius: 14,
              padding: '20px 24px', border: '1px solid var(--border-color)',
            }}>
              <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 8, color: 'var(--text-primary)' }}>
                🏪 {t('about.struggle2Title')}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                {t('about.struggle2Desc')}
              </p>
            </div>
          </div>

          <p style={{
            color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 15,
            marginTop: 20, fontStyle: 'italic',
          }}>
            {t('about.struggleConclusion')}
          </p>
        </div>

        {/* ── From Empathy to Action ── */}
        <div style={{
          textAlign: 'center', marginBottom: 56,
          padding: '32px 40px', borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(91,106,245,0.08), rgba(249,115,22,0.08))',
          border: '1.5px solid rgba(91,106,245,0.18)',
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
            <StarOutlined style={{ color: '#f97316', marginRight: 8 }} />
            {t('about.empathyTitle')}
          </h3>
          <p style={{
            color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8,
            maxWidth: 640, margin: '0 auto 12px',
          }}>
            {t('about.empathy1')}
          </p>
          <p style={{
            fontWeight: 700, fontSize: 17,
            background: 'linear-gradient(90deg, #5b6af5, #f97316)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {t('about.empathyMission')}
          </p>
        </div>

        {/* ── What We Stand For — 3 Principles ── */}
        <div style={{ marginBottom: 56 }}>
          <h3 style={{
            fontSize: 22, fontWeight: 700, textAlign: 'center',
            marginBottom: 32, color: 'var(--text-primary)',
          }}>
            {t('about.principlesHeading')}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {principles.map((p, i) => (
              <div key={i} style={{
                borderRadius: 18, padding: '28px 24px',
                background: 'var(--bg-primary)',
                border: '1.5px solid var(--border-color)',
                textAlign: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14, margin: '0 auto 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${p.color}14`, color: p.color, fontSize: 24,
                }}>
                  {p.icon}
                </div>
                <h4 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: 'var(--text-primary)' }}>
                  {p.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dedication ── */}
        <div style={{
          textAlign: 'center', padding: '28px 32px', borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(91,106,245,0.1), rgba(118,75,162,0.1), rgba(249,115,22,0.1))',
          border: '1.5px solid rgba(91,106,245,0.2)',
        }}>
          <p style={{
            fontWeight: 600, fontSize: 16, lineHeight: 1.7,
            color: 'var(--text-primary)',
          }}>
            ❤️ {t('about.dedication')}
          </p>
          <p style={{
            fontWeight: 800, fontSize: 18, marginTop: 12,
            background: 'linear-gradient(90deg, #5b6af5, #764ba2, #f97316)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {t('about.dedicationCta')}
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          #about .container > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          #about .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
