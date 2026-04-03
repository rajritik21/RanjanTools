import React from 'react'
import { Link } from 'react-router-dom'
import { ToolOutlined, MailOutlined, HeartFilled } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const tools = [
    { name: 'PDF to JPG', path: '/tools/pdf-to-jpg' },
    { name: 'Image Resizer', path: '/tools/image-resizer' },
    { name: 'Image Compressor', path: '/tools/image-compressor' },
    { name: 'Profile Picture', path: '/tools/profile-picture' },
    { name: 'PDF Merger', path: '/tools/pdf-merger' },
    { name: 'ID Card Joiner', path: '/tools/id-card-joiner' },
  ]

  const colStyle = {
    display: 'flex', flexDirection: 'column', gap: 12
  }

  const linkStyle = {
    color: 'rgba(255,255,255,0.65)',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'color 0.2s',
    display: 'inline-block'
  }

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a1a4e 0%, #0f0c29 50%, #302b63 100%)',
      color: '#fff',
      padding: '60px 0 24px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 48
        }}>

          {/* Brand */}
          <div style={colStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40, height: 40,
                background: 'linear-gradient(135deg, #5b6af5, #f97316)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
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
              onMouseEnter={e => e.target.style.color = '#f97316'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
            >
              <MailOutlined /> burabakk2241@gmail.com
            </a>
          </div>

          {/* Quick Tools */}
          <div style={colStyle}>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
              Popular Tools
            </h4>
            {tools.map(tool => (
              <Link
                key={tool.path}
                to={tool.path}
                style={linkStyle}
                onMouseEnter={e => e.target.style.color = '#5b6af5'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
              >
                → {tool.name}
              </Link>
            ))}
          </div>

          {/* Links */}
          <div style={colStyle}>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Company</h4>
            <a href="/#about" style={linkStyle}
              onMouseEnter={e => e.target.style.color = '#5b6af5'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>
              {t('footer.about')}
            </a>
            <a href="/#reviews" style={linkStyle}
              onMouseEnter={e => e.target.style.color = '#5b6af5'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>
              Reviews
            </a>
            <a href="/#faq" style={linkStyle}
              onMouseEnter={e => e.target.style.color = '#5b6af5'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>
              FAQ
            </a>
            <a href={`mailto:burabakk2241@gmail.com`} style={linkStyle}
              onMouseEnter={e => e.target.style.color = '#5b6af5'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>
              {t('footer.contact')}
            </a>
          </div>

          {/* Legal */}
          <div style={colStyle}>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Legal</h4>
            <Link to="/privacy" style={linkStyle}
              onMouseEnter={e => e.target.style.color = '#5b6af5'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" style={linkStyle}
              onMouseEnter={e => e.target.style.color = '#5b6af5'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>
              {t('footer.terms')}
            </Link>
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
          textAlign: 'center'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
            {t('footer.copy')} &nbsp; Made with <HeartFilled style={{ color: '#f97316' }} /> by Ritik Ranjan
          </span>
        </div>
      </div>
    </footer>
  )
}
