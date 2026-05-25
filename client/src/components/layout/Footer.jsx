import React from 'react'
import { Link } from 'react-router-dom'
import { ToolOutlined, MailOutlined, HeartFilled } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { getFeaturedTools, categories, getToolsByCategory } from '../../config/tools'

const linkStyle = {
  color: 'rgba(255,255,255,0.65)',
  textDecoration: 'none',
  fontSize: 14,
  transition: 'color 0.2s',
  display: 'inline-block',
}

function FooterLink({ to, href, children }) {
  const style = linkStyle
  const hover = (e) => e.target.style.color = '#5b6af5'
  const leave = (e) => e.target.style.color = 'rgba(255,255,255,0.65)'

  if (to) return (
    <Link to={to} style={style} onMouseEnter={hover} onMouseLeave={leave}>{children}</Link>
  )
  return (
    <a href={href} style={style} onMouseEnter={hover} onMouseLeave={leave}>{children}</a>
  )
}

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  // Auto-generated from config — no hardcoding
  const popularTools = getFeaturedTools().slice(0, 6)
  const pdfTools = getToolsByCategory('pdf').slice(0, 6)
  const imageTools = getToolsByCategory('image').slice(0, 6)

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a1a4e 0%, #0f0c29 50%, #302b63 100%)',
      color: '#fff',
      padding: '60px 0 24px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40, height: 40,
                background: 'linear-gradient(135deg, #5b6af5, #f97316)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ToolOutlined style={{ color: '#fff', fontSize: 20 }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: 22, color: '#fff' }}>RanjanTools</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.7 }}>
              {t('footer.tagline')}
            </p>
            <a
              href="mailto:burabakk2241@gmail.com"
              style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: 6 }}
              onMouseEnter={(e) => e.target.style.color = '#f97316'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.65)'}
            >
              <MailOutlined /> burabakk2241@gmail.com
            </a>

            {/* Category pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/${cat.slug}`}
                  style={{
                    padding: '4px 10px', borderRadius: 999,
                    background: `${cat.color}20`,
                    border: `1px solid ${cat.color}40`,
                    color: cat.color, fontSize: 11, fontWeight: 700,
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = `${cat.color}35`}
                  onMouseLeave={(e) => e.currentTarget.style.background = `${cat.color}20`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Tools — auto from config */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
              ⚡ Popular Tools
            </h4>
            {popularTools.map((tool) => (
              <FooterLink key={tool.slug} to={`/tools/${tool.slug}`}>
                → {tool.name}
              </FooterLink>
            ))}
          </div>

          {/* PDF Tools — auto from config */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 style={{ color: '#ef4444', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
              📄 PDF Tools
            </h4>
            {pdfTools.map((tool) => (
              <FooterLink key={tool.slug} to={`/tools/${tool.slug}`}>
                → {tool.name}
              </FooterLink>
            ))}
            <FooterLink to="/pdf-tools">View All PDF Tools →</FooterLink>
          </div>

          {/* Image Tools — auto from config */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 style={{ color: '#3b82f6', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
              🖼️ Image Tools
            </h4>
            {imageTools.map((tool) => (
              <FooterLink key={tool.slug} to={`/tools/${tool.slug}`}>
                → {tool.name}
              </FooterLink>
            ))}
            <FooterLink to="/image-tools">View All Image Tools →</FooterLink>
          </div>

          {/* Company */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Company</h4>
            <FooterLink href="/#about">{t('footer.about')}</FooterLink>
            <FooterLink href="/#reviews">Reviews</FooterLink>
            <FooterLink href="/#faq">FAQ</FooterLink>
            <FooterLink href="mailto:burabakk2241@gmail.com">{t('footer.contact')}</FooterLink>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginTop: 8, marginBottom: 4 }}>Legal</h4>
            <FooterLink to="/privacy">{t('footer.privacy')}</FooterLink>
            <FooterLink to="/terms">{t('footer.terms')}</FooterLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
          textAlign: 'center',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
            {t('footer.copy')} &nbsp; Made with <HeartFilled style={{ color: '#f97316' }} /> by Ritik Ranjan
          </span>
        </div>
      </div>
    </footer>
  )
}
