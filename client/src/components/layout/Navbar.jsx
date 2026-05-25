import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Switch, Tooltip, Drawer, Button } from 'antd'
import {
  MoonOutlined, SunOutlined, GlobalOutlined, MenuOutlined,
  ToolOutlined, SearchOutlined, ArrowRightOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import useStore from '../../store/useStore'
import i18n from '../../i18n'
import { categories, getToolsByCategory, getFeaturedTools } from '../../config/tools'
import ToolIcon from '../tools/ToolIcon'
import ToolSearch from '../search/ToolSearch'

export default function Navbar() {
  const { theme, toggleTheme, language, setLanguage } = useStore()
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const megaRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close mega on route change
  useEffect(() => {
    setMegaOpen(false)
    setDrawerOpen(false)
  }, [location.pathname])

  // Keyboard shortcut: Ctrl+K / Cmd+K opens search
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const toggleLanguage = () => {
    const next = language === 'en' ? 'hi' : 'en'
    setLanguage(next)
    i18n.changeLanguage(next)
  }

  const featured = getFeaturedTools().slice(0, 5)

  const navStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    transition: 'all 0.3s ease',
    background: scrolled
      ? (theme === 'dark' ? 'rgba(10,15,30,0.95)' : 'rgba(255,255,255,0.95)')
      : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : 'none',
    boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
  }

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginRight: 'auto' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #5b6af5, #f97316)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ToolOutlined style={{ color: '#fff', fontSize: 18 }} />
          </div>
          <span style={{
            fontWeight: 800, fontSize: 20,
            background: 'linear-gradient(135deg, #5b6af5, #f97316)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            RanjanTools
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {/* Home */}
          <NavLink href="/">{t('nav.home')}</NavLink>

          {/* Tools mega menu trigger */}
          <div ref={megaRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setMegaOpen(!megaOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 14px', borderRadius: 8,
                fontWeight: 500, fontSize: 14,
                color: megaOpen ? '#5b6af5' : 'var(--text-primary)',
                background: megaOpen ? 'rgba(91,106,245,0.1)' : 'transparent',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t('nav.tools')}
              <DownOutlined style={{
                fontSize: 10,
                transition: 'transform 0.2s',
                transform: megaOpen ? 'rotate(180deg)' : 'none',
              }} />
            </button>

            {megaOpen && <MegaMenu featured={featured} onClose={() => setMegaOpen(false)} />}
          </div>

          <NavLink href="/#about">{t('nav.about')}</NavLink>
          <NavLink href="/#reviews">{t('nav.reviews')}</NavLink>
          <NavLink href="/#faq">{t('nav.faq')}</NavLink>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 16 }}>
          {/* Search */}
          <Tooltip title="Search tools (Ctrl+K)">
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 8,
                border: '1.5px solid var(--border)',
                background: 'transparent', cursor: 'pointer',
                fontSize: 13, color: 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#5b6af5'; e.currentTarget.style.color = '#5b6af5' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              <SearchOutlined />
              <span className="search-hint">Search</span>
            </button>
          </Tooltip>

          {/* Language */}
          <Tooltip title={language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में बदलें'}>
            <button
              onClick={toggleLanguage}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 8,
                border: '1.5px solid var(--border)',
                background: 'transparent', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, color: 'var(--text-primary)',
                transition: 'all 0.2s',
              }}
            >
              <GlobalOutlined />
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
          </Tooltip>

          {/* Theme */}
          <Tooltip title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              style={{ background: theme === 'dark' ? '#5b6af5' : '#94a3b8' }}
            />
          </Tooltip>

          {/* Mobile menu */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
            className="mobile-menu-btn"
            style={{ display: 'none' }}
          />
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        title={<span style={{ fontWeight: 800, color: '#5b6af5' }}>RanjanTools</span>}
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={300}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Search button */}
          <button
            onClick={() => { setDrawerOpen(false); setSearchOpen(true) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 16px', borderRadius: 10,
              border: '1.5px solid var(--border)',
              background: 'transparent', cursor: 'pointer',
              fontWeight: 500, fontSize: 14,
              color: 'var(--text-secondary)',
              marginBottom: 8,
            }}
          >
            <SearchOutlined /> Search tools…
          </button>

          {/* Nav links */}
          {[
            { href: '/', label: t('nav.home') },
            { href: '/#about', label: t('nav.about') },
            { href: '/#reviews', label: t('nav.reviews') },
            { href: '/#faq', label: t('nav.faq') },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              style={{
                padding: '12px 16px', borderRadius: 10,
                fontWeight: 500, fontSize: 15,
                color: 'var(--text-primary)', textDecoration: 'none',
                display: 'block', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(91,106,245,0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              {link.label}
            </a>
          ))}

          {/* Category links */}
          <div style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 16px', marginBottom: 8 }}>
              Categories
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/${cat.slug}`}
                onClick={() => setDrawerOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 16px', borderRadius: 10,
                  color: 'var(--text-primary)', textDecoration: 'none',
                  fontWeight: 500, fontSize: 14, transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = `${cat.color}10`}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ color: cat.color }}><ToolIcon icon={cat.icon} /></span>
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center', padding: '0 4px' }}>
            <button onClick={toggleLanguage} style={{
              padding: '8px 16px', borderRadius: 8, border: '1.5px solid var(--border)',
              background: 'transparent', cursor: 'pointer', fontWeight: 600,
              fontSize: 14, color: 'var(--text-primary)',
            }}>
              <GlobalOutlined /> {language === 'en' ? ' हिंदी' : ' English'}
            </button>
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
          </div>
        </div>
      </Drawer>

      {/* Spacer */}
      <div style={{ height: 64 }} />

      {/* Search Overlay */}
      {searchOpen && <ToolSearch onClose={() => setSearchOpen(false)} />}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .search-hint { display: none; }
        }
      `}</style>
    </>
  )
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      style={{
        padding: '6px 14px', borderRadius: 8, fontWeight: 500, fontSize: 14,
        color: 'var(--text-primary)', textDecoration: 'none', transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => { e.target.style.background = 'rgba(91,106,245,0.1)'; e.target.style.color = '#5b6af5' }}
      onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-primary)' }}
    >
      {children}
    </a>
  )
}

function MegaMenu({ featured, onClose }) {
  const navigate = useNavigate()

  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 780,
      background: 'var(--bg-card)',
      borderRadius: 20,
      boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
      border: '1px solid var(--border)',
      padding: 24,
      zIndex: 2000,
      animation: 'fadeInUp 0.2s ease',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {/* Popular Tools column */}
        <div>
          <h4 style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 12,
          }}>⚡ Popular</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {featured.map((tool) => (
              <MegaMenuItem key={tool.slug} tool={tool} onClose={onClose} />
            ))}
            <Link
              to="/#tools"
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '7px 10px', borderRadius: 8,
                color: '#5b6af5', fontWeight: 600, fontSize: 12,
                textDecoration: 'none', marginTop: 4,
              }}
            >
              View all <ArrowRightOutlined style={{ fontSize: 10 }} />
            </Link>
          </div>
        </div>

        {/* One column per category */}
        {categories.map((cat) => {
          const catTools = getToolsByCategory(cat.id).slice(0, 6)
          return (
            <div key={cat.id}>
              <h4 style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: 1, color: cat.color, marginBottom: 12,
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
                <ToolIcon icon={cat.icon} /> {cat.label}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {catTools.map((tool) => (
                  <MegaMenuItem key={tool.slug} tool={tool} onClose={onClose} />
                ))}
                <Link
                  to={`/${cat.slug}`}
                  onClick={onClose}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '7px 10px', borderRadius: 8,
                    color: cat.color, fontWeight: 600, fontSize: 12,
                    textDecoration: 'none', marginTop: 4,
                  }}
                >
                  All {cat.label} <ArrowRightOutlined style={{ fontSize: 10 }} />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MegaMenuItem({ tool, onClose }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => { navigate(`/tools/${tool.slug}`); onClose?.() }}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '7px 10px', borderRadius: 8,
        cursor: 'pointer', transition: 'all 0.15s',
        color: 'var(--text-primary)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = `${tool.color}10`}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{ color: tool.color, fontSize: 14, flexShrink: 0 }}>
        <ToolIcon icon={tool.icon} />
      </span>
      <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>
        {tool.name}
        {!tool.implemented && (
          <span style={{
            marginLeft: 4, fontSize: 9, fontWeight: 700,
            background: '#f97316', color: '#fff',
            padding: '1px 4px', borderRadius: 4,
          }}>SOON</span>
        )}
      </span>
    </div>
  )
}
