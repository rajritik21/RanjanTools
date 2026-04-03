import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, Tag } from 'antd'
import {
  FilePdfOutlined, PictureOutlined, ExpandOutlined,
  UserOutlined, IdcardOutlined, CalendarOutlined,
  MergeCellsOutlined, RetweetOutlined, CompressOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'

const TOOLS = [
  {
    key: 'pdfToJpg',
    path: '/tools/pdf-to-jpg',
    icon: <FilePdfOutlined />,
    color: '#ef4444',
    bg: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
    bgDark: 'linear-gradient(135deg, #3f1010, #2d0a0a)',
    tag: 'PDF'
  },
  {
    key: 'jpgToPng',
    path: '/tools/jpg-to-png',
    icon: <RetweetOutlined />,
    color: '#3b82f6',
    bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
    bgDark: 'linear-gradient(135deg, #0f1f40, #0a1628)',
    tag: 'Image'
  },
  {
    key: 'imageResizer',
    path: '/tools/image-resizer',
    icon: <ExpandOutlined />,
    color: '#8b5cf6',
    bg: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
    bgDark: 'linear-gradient(135deg, #201040, #160830)',
    tag: 'Image'
  },
  {
    key: 'profilePic',
    path: '/tools/profile-picture',
    icon: <UserOutlined />,
    color: '#ec4899',
    bg: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
    bgDark: 'linear-gradient(135deg, #3f0f28, #2d0a1c)',
    tag: 'Image'
  },
  {
    key: 'idCard',
    path: '/tools/id-card-joiner',
    icon: <IdcardOutlined />,
    color: '#f97316',
    bg: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
    bgDark: 'linear-gradient(135deg, #3f1a0a, #2d1005)',
    tag: 'PDF'
  },
  {
    key: 'datePhoto',
    path: '/tools/date-on-photo',
    icon: <CalendarOutlined />,
    color: '#14b8a6',
    bg: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
    bgDark: 'linear-gradient(135deg, #0a2f2b, #061e1b)',
    tag: 'Image'
  },
  {
    key: 'pdfMerger',
    path: '/tools/pdf-merger',
    icon: <MergeCellsOutlined />,
    color: '#5b6af5',
    bg: 'linear-gradient(135deg, #f0f4ff, #e0e7ff)',
    bgDark: 'linear-gradient(135deg, #101640, #0a0f2d)',
    tag: 'PDF'
  },
  {
    key: 'imageConverter',
    path: '/tools/image-converter',
    icon: <PictureOutlined />,
    color: '#0ea5e9',
    bg: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
    bgDark: 'linear-gradient(135deg, #0a2636, #061720)',
    tag: 'Image'
  },
  {
    key: 'imageCompressor',
    path: '/tools/image-compressor',
    icon: <CompressOutlined />,
    color: '#22c55e',
    bg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
    bgDark: 'linear-gradient(135deg, #0a2f14, #061e0d)',
    tag: 'Image'
  },
]

export default function ToolsGrid() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section id="tools" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="section-header">
          <span className="overline">{t('tools.title')}</span>
          <h2>{t('tools.subtitle')}</h2>
          <p>Pick a tool and start working instantly — no sign-up, no ads, no limits.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20
        }}>
          {TOOLS.map((tool, idx) => {
            const toolData = t(`tools.${tool.key}`, { returnObjects: true })
            return (
              <div
                key={tool.key}
                className="card"
                onClick={() => navigate(tool.path)}
                style={{
                  padding: 28,
                  cursor: 'pointer',
                  animationDelay: `${idx * 0.07}s`,
                  animationFillMode: 'both',
                }}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(tool.path)}
              >
                {/* Icon */}
                <div style={{
                  width: 56, height: 56,
                  borderRadius: 16,
                  background: tool.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, color: tool.color,
                  marginBottom: 18,
                  transition: 'transform 0.3s ease',
                  boxShadow: `0 4px 16px ${tool.color}25`
                }}>
                  {tool.icon}
                </div>

                {/* Tag */}
                <Tag color={tool.color} style={{ marginBottom: 10, borderRadius: 6, fontWeight: 600 }}>
                  {tool.tag}
                </Tag>

                {/* Title */}
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                  {toolData.name}
                </h3>

                {/* Description */}
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                  {toolData.desc}
                </p>

                {/* CTA */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: tool.color, fontWeight: 600, fontSize: 14
                }}>
                  {t('common.openTool')} <ArrowRightOutlined style={{ fontSize: 12 }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
