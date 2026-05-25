import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { categories, getToolsByCategory, getCategoryById } from '../config/tools'
import ToolCard from '../components/tools/ToolCard'
import ToolIcon from '../components/tools/ToolIcon'

// Slug → category id map
const SLUG_TO_ID = {
  'pdf-tools':       'pdf',
  'image-tools':     'image',
  'smart-utilities': 'utility',
}

export default function CategoryPage({ categoryId: propCategoryId }) {
  const { categorySlug } = useParams()
  const categoryId = propCategoryId || SLUG_TO_ID[categorySlug]
  const category = getCategoryById(categoryId)
  const allTools = getToolsByCategory(categoryId)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // 'all' | 'ready' | 'soon'

  if (!category) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2>Category not found</h2>
        <Link to="/">Go Home</Link>
      </div>
    )
  }

  const filtered = allTools.filter((t) => {
    const matchSearch = !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'all' ||
      (filter === 'ready' && t.implemented) ||
      (filter === 'soon' && !t.implemented)
    return matchSearch && matchFilter
  })

  const readyCount = allTools.filter((t) => t.implemented).length
  const soonCount = allTools.filter((t) => !t.implemented).length

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ── Category Hero ── */}
      <div style={{
        background: 'var(--bg-hero)',
        padding: '64px 0 56px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${category.color}40 0%, transparent 70%)`,
          top: '-100px', right: '-50px', pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, display: 'block', marginBottom: 20 }}>
            ← Back to Home
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16 }}>
            <div style={{
              width: 60, height: 60, borderRadius: 18,
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, color: '#fff',
            }}>
              <ToolIcon icon={category.icon} />
            </div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, margin: 0 }}>
              {category.label}
            </h1>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, maxWidth: 560, lineHeight: 1.65, marginBottom: 28 }}>
            {category.description}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: 'Total Tools', value: allTools.length, color: '#fff' },
              { label: 'Ready to Use', value: readyCount, color: '#22c55e' },
              { label: 'Coming Soon', value: soonCount, color: '#f97316' },
            ].map((s) => (
              <div key={s.label} style={{
                padding: '10px 20px', borderRadius: 12,
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <div style={{ color: s.color, fontWeight: 800, fontSize: 22 }}>{s.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters & Search ── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Input
            prefix={<SearchOutlined style={{ color: 'var(--text-muted)' }} />}
            placeholder={`Search ${category.label}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 320, borderRadius: 10 }}
            allowClear
          />
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { key: 'all', label: 'All Tools' },
              { key: 'ready', label: '✅ Ready' },
              { key: 'soon', label: '🔜 Coming Soon' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
                  fontWeight: 600, fontSize: 13,
                  border: '2px solid',
                  borderColor: filter === f.key ? category.color : 'var(--border)',
                  background: filter === f.key ? `${category.color}12` : 'transparent',
                  color: filter === f.key ? category.color : 'var(--text-secondary)',
                  transition: 'all 0.2s',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: 13 }}>
            {filtered.length} tool{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Tools Grid ── */}
      <div className="container" style={{ padding: '40px 24px 80px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <SearchOutlined style={{ fontSize: 40, marginBottom: 16, display: 'block' }} />
            <p style={{ fontSize: 16 }}>No tools found matching "{search}"</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </div>

      {/* ── Other Categories ── */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <h3 style={{ textAlign: 'center', marginBottom: 24, fontWeight: 700, fontSize: 18 }}>
            Explore Other Categories
          </h3>
          <div style={{
            display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {categories.filter((c) => c.id !== categoryId).map((cat) => (
              <Link
                key={cat.id}
                to={`/${cat.slug}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '14px 24px', borderRadius: 14,
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border)',
                  textDecoration: 'none', color: 'var(--text-primary)',
                  fontWeight: 600, fontSize: 15,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cat.color
                  e.currentTarget.style.color = cat.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
              >
                <span style={{ color: cat.color, fontSize: 20 }}>
                  <ToolIcon icon={cat.icon} />
                </span>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
