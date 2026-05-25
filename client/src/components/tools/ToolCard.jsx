import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons'
import { getCategoryById } from '../../config/tools'
import ToolIcon from './ToolIcon'

/**
 * Reusable ToolCard component — used on homepage, category pages, related tools.
 * Props: { tool } — full tool config object from tools.js
 */
export default function ToolCard({ tool, compact = false }) {
  const navigate = useNavigate()
  const category = getCategoryById(tool.category)

  const handleClick = () => navigate(`/tools/${tool.slug}`)

  if (compact) {
    return (
      <div
        className="card"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        style={{
          padding: '14px 18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{
          width: 36, height: 36,
          borderRadius: 10,
          background: tool.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, color: tool.color,
          flexShrink: 0,
        }}>
          <ToolIcon icon={tool.icon} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {tool.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {tool.description}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      style={{
        padding: 28,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: -20, right: -20,
        width: 80, height: 80,
        borderRadius: '50%',
        background: `${tool.color}10`,
        pointerEvents: 'none',
      }} />

      {/* Icon */}
      <div style={{
        width: 56, height: 56,
        borderRadius: 16,
        background: tool.gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, color: tool.color,
        marginBottom: 16,
        boxShadow: `0 4px 16px ${tool.color}25`,
        transition: 'transform 0.3s ease',
      }}>
        <ToolIcon icon={tool.icon} />
      </div>

      {/* Category badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 10px',
        borderRadius: 999,
        background: `${tool.color}15`,
        border: `1px solid ${tool.color}30`,
        color: tool.color,
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 10,
      }}>
        {category?.label || tool.category}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 17, fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: 8, lineHeight: 1.3,
      }}>
        {tool.name}
        {!tool.implemented && (
          <span style={{
            marginLeft: 8,
            fontSize: 10, fontWeight: 700,
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            color: '#fff',
            padding: '2px 7px',
            borderRadius: 999,
            verticalAlign: 'middle',
          }}>SOON</span>
        )}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: 14, color: 'var(--text-secondary)',
        lineHeight: 1.65, marginBottom: 20,
      }}>
        {tool.description}
      </p>

      {/* CTA */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        color: tool.color, fontWeight: 600, fontSize: 14,
        transition: 'gap 0.2s',
      }}>
        {tool.implemented ? 'Open Tool' : 'Learn More'}
        <ArrowRightOutlined style={{ fontSize: 12 }} />
      </div>
    </div>
  )
}
