import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons'
import { getToolsByCategory, getFeaturedTools, getCategoryById } from '../../config/tools'
import ToolCard from '../../components/tools/ToolCard'
import ToolIcon from '../../components/tools/ToolIcon'

/**
 * Reusable homepage section that auto-populates from tools config.
 *
 * Props:
 *   categoryId:  'pdf' | 'image' | 'utility' | 'popular'
 *   title:       section heading (falls back to category label)
 *   subtitle:    section subheading
 *   viewAllPath: route path for "View All" button
 *   viewAllLabel: label for "View All" button
 *   limit:       number of tools to show (default 6)
 *   dark:        dark background variant
 */
export default function CategorySection({
  categoryId,
  title,
  subtitle,
  viewAllPath,
  viewAllLabel,
  limit = 6,
  dark = false,
}) {
  const category = categoryId !== 'popular' ? getCategoryById(categoryId) : null

  const tools =
    categoryId === 'popular'
      ? getFeaturedTools().slice(0, limit)
      : getToolsByCategory(categoryId).slice(0, limit)

  const sectionTitle = title || category?.label || 'Tools'
  const accentColor = category?.color || '#5b6af5'

  if (tools.length === 0) return null

  return (
    <section
      id={categoryId}
      className="section"
      style={{ background: dark ? 'var(--surface)' : 'var(--bg)' }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            {/* Category badge */}
            {category && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '4px 14px', borderRadius: 999,
                background: `${accentColor}12`,
                border: `1px solid ${accentColor}30`,
                color: accentColor, fontSize: 12, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: 0.8,
                marginBottom: 12,
              }}>
                <ToolIcon icon={category.icon} />
                {category.label}
              </div>
            )}

            {!category && (
              <span className="overline" style={{ display: 'block', marginBottom: 8 }}>
                Most Used
              </span>
            )}

            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
              {sectionTitle}
            </h2>
            {subtitle && (
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginTop: 8, maxWidth: 560, lineHeight: 1.65 }}>
                {subtitle}
              </p>
            )}
          </div>

          {viewAllPath && (
            <Link
              to={viewAllPath}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 22px', borderRadius: 12,
                border: `2px solid ${accentColor}`,
                color: accentColor, fontWeight: 700, fontSize: 14,
                textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = accentColor
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = accentColor
              }}
            >
              {viewAllLabel || 'View All'} <ArrowRightOutlined style={{ fontSize: 12 }} />
            </Link>
          )}
        </div>

        {/* Tools Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
