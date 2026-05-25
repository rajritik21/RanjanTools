import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { searchTools, getCategoryById } from '../../config/tools'
import ToolIcon from '../tools/ToolIcon'

export default function ToolSearch({ onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    setResults(searchTools(query))
    setActiveIdx(-1)
  }, [query])

  const handleSelect = (tool) => {
    navigate(`/tools/${tool.slug}`)
    onClose?.()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      handleSelect(results[activeIdx])
    } else if (e.key === 'Escape') {
      onClose?.()
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '80px 24px 24px',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div style={{
        width: '100%', maxWidth: 640,
        background: 'var(--bg-card)',
        borderRadius: 20, overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
        border: '1px solid var(--border)',
      }}>
        {/* Search Input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '16px 20px',
          borderBottom: results.length > 0 || query ? '1px solid var(--border)' : 'none',
        }}>
          <SearchOutlined style={{ fontSize: 20, color: '#5b6af5', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search tools... (e.g. compress, resize, pdf, photo)"
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: 17, background: 'transparent',
              color: 'var(--text-primary)',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: 16, padding: 4,
            }}>
              <CloseOutlined />
            </button>
          )}
          <button onClick={onClose} style={{
            background: 'none', border: '1.5px solid var(--border)',
            borderRadius: 6, cursor: 'pointer', padding: '3px 8px',
            color: 'var(--text-muted)', fontSize: 12, fontWeight: 600,
          }}>
            ESC
          </button>
        </div>

        {/* Results */}
        {query && results.length === 0 && (
          <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <SearchOutlined style={{ fontSize: 32, marginBottom: 10, display: 'block' }} />
            <p>No tools found for "<strong>{query}</strong>"</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>Try: compress, resize, pdf, merge, convert…</p>
          </div>
        )}

        {results.length > 0 && (
          <div style={{ maxHeight: 420, overflowY: 'auto' }}>
            {results.map((tool, i) => {
              const category = getCategoryById(tool.category)
              return (
                <div
                  key={tool.slug}
                  onClick={() => handleSelect(tool)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '12px 20px', cursor: 'pointer',
                    background: activeIdx === i ? 'rgba(91,106,245,0.07)' : 'transparent',
                    borderLeft: activeIdx === i ? '3px solid #5b6af5' : '3px solid transparent',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                >
                  {/* Icon */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: tool.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, color: tool.color,
                  }}>
                    <ToolIcon icon={tool.icon} />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>
                        {tool.name}
                      </span>
                      {!tool.implemented && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '1px 6px',
                          borderRadius: 999, background: '#f97316', color: '#fff',
                        }}>SOON</span>
                      )}
                    </div>
                    <div style={{
                      fontSize: 12, color: 'var(--text-muted)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {tool.description}
                    </div>
                  </div>

                  {/* Category badge */}
                  <span style={{
                    padding: '2px 10px', borderRadius: 999,
                    background: `${tool.color}15`,
                    color: tool.color, fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: 0.5,
                    flexShrink: 0,
                  }}>
                    {category?.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer hints */}
        {!query && (
          <div style={{ padding: '20px', color: 'var(--text-muted)', fontSize: 13 }}>
            <p style={{ marginBottom: 10, fontWeight: 600 }}>Popular searches</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['compress', 'resize', 'pdf merger', 'jpg to pdf', 'remove background', 'passport photo'].map((hint) => (
                <button
                  key={hint}
                  onClick={() => setQuery(hint)}
                  style={{
                    padding: '5px 12px', borderRadius: 8,
                    background: 'var(--surface)',
                    border: '1.5px solid var(--border)',
                    cursor: 'pointer', fontSize: 12, fontWeight: 500,
                    color: 'var(--text-secondary)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#5b6af5'
                    e.currentTarget.style.color = '#5b6af5'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
