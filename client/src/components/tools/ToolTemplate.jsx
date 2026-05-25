import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRightOutlined, ClockCircleOutlined, CheckCircleFilled } from '@ant-design/icons'
import ToolIcon from './ToolIcon'
import ToolCard from './ToolCard'
import { getRelatedTools, getCategoryById } from '../../config/tools'

/**
 * Shared Coming Soon template for tools that are not yet implemented.
 * Shows a polished layout with features, FAQ, related tools.
 */
export default function ToolTemplate({ tool }) {
  const navigate = useNavigate()
  const related = getRelatedTools(tool.slug, 4)
  const category = getCategoryById(tool.category)

  return (
    <div style={{ minHeight: 'calc(100vh - 130px)', paddingBottom: 80 }}>
      {/* ── Tool Header ── */}
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '40px 0 48px',
      }}>
        <div className="container">
          <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: 14, display: 'block', marginBottom: 20 }}>
            ← Back to Home
          </Link>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            {/* Icon */}
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: tool.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 34, color: tool.color, flexShrink: 0,
              boxShadow: `0 8px 24px ${tool.color}30`,
            }}>
              <ToolIcon icon={tool.icon} />
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              {/* Category pill */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '3px 12px', borderRadius: 999,
                background: `${tool.color}15`, border: `1px solid ${tool.color}30`,
                color: tool.color, fontSize: 12, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: 0.5,
                marginBottom: 10,
              }}>
                {category?.label}
              </div>

              <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 900, margin: '0 0 10px' }}>
                {tool.name}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.65, maxWidth: 600, margin: 0 }}>
                {tool.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 48 }}>

        {/* ── Coming Soon Banner ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(91,106,245,0.06), rgba(249,115,22,0.06))',
          border: '2px dashed rgba(91,106,245,0.25)',
          borderRadius: 24, padding: '48px 40px',
          textAlign: 'center', marginBottom: 56,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #5b6af5, #f97316)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
            animation: 'float 3s ease-in-out infinite',
          }}>
            <ClockCircleOutlined style={{ fontSize: 32, color: '#fff' }} />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
            This Tool is Coming Soon!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.7 }}>
            <strong>{tool.name}</strong> is currently under development. We're building it with
            the same care and quality as all our other tools. Stay tuned!
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/#tools')}
              className="btn-primary"
              style={{ textDecoration: 'none' }}
            >
              Explore Available Tools <ArrowRightOutlined />
            </button>
            <a
              href={`mailto:burabakk2241@gmail.com?subject=Request: ${tool.name}`}
              className="btn-accent"
              style={{ textDecoration: 'none' }}
            >
              Request Priority
            </a>
          </div>
        </div>

        {/* ── Features Section ── */}
        {tool.features?.length > 0 && (
          <div style={{ marginBottom: 56 }}>
            <div className="section-header" style={{ marginBottom: 32 }}>
              <span className="overline">What to Expect</span>
              <h2>Key Features of {tool.name}</h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}>
              {tool.features.map((feat, i) => (
                <div key={i} className="card" style={{ padding: '24px 28px' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: tool.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16,
                  }}>
                    <CheckCircleFilled style={{ color: tool.color, fontSize: 20 }} />
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--text-primary)' }}>
                    {feat.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FAQ Section ── */}
        {tool.faqs?.length > 0 && (
          <div style={{ marginBottom: 56 }}>
            <div className="section-header" style={{ marginBottom: 32 }}>
              <span className="overline">FAQ</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720 }}>
              {tool.faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} color={tool.color} />
              ))}
            </div>
          </div>
        )}

        {/* ── Related Tools ── */}
        {related.length > 0 && (
          <div style={{ marginBottom: 56 }}>
            <div className="section-header" style={{ marginBottom: 32 }}>
              <span className="overline">Related Tools</span>
              <h2>You Might Also Like</h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 20,
            }}>
              {related.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA Section ── */}
        <div style={{
          background: 'linear-gradient(135deg, #5b6af5, #764ba2)',
          borderRadius: 24, padding: '48px 40px',
          textAlign: 'center', color: '#fff',
        }}>
          <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 800, marginBottom: 12 }}>
            Explore Our Available Tools
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 28 }}>
            We have 9+ tools ready to use right now — all free, no sign-up needed.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '14px 36px', background: '#fff', color: '#5b6af5',
              border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700,
              cursor: 'pointer', transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            View All Tools <ArrowRightOutlined />
          </button>
        </div>

      </div>
    </div>
  )
}

function FaqItem({ faq, color }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div
      className="card"
      style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 24px', gap: 12,
      }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>
          {faq.q}
        </span>
        <span style={{
          color, fontWeight: 700, fontSize: 20, flexShrink: 0,
          transition: 'transform 0.2s',
          transform: open ? 'rotate(45deg)' : 'none',
        }}>+</span>
      </div>
      {open && (
        <div style={{
          padding: '0 24px 18px',
          color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7,
          borderTop: '1px solid var(--border)',
          paddingTop: 14,
        }}>
          {faq.a}
        </div>
      )}
    </div>
  )
}
