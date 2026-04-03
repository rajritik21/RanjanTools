import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Switch, Tooltip, Drawer, Button } from 'antd'
import {
  MoonOutlined, SunOutlined, GlobalOutlined, MenuOutlined,
  CloseOutlined, ToolOutlined
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import useStore from '../../store/useStore'
import i18n from '../../i18n'

export default function Navbar() {
  const { theme, toggleTheme, language, setLanguage } = useStore()
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const next = language === 'en' ? 'hi' : 'en'
    setLanguage(next)
    i18n.changeLanguage(next)
  }

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.tools'), href: '/#tools' },
    { label: t('nav.about'), href: '/#about' },
    { label: t('nav.reviews'), href: '/#reviews' },
    { label: t('nav.faq'), href: '/#faq' },
  ]

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    transition: 'all 0.3s ease',
    background: scrolled
      ? (theme === 'dark' ? 'rgba(10,15,30,0.92)' : 'rgba(255,255,255,0.92)')
      : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? `1px solid var(--border)` : 'none',
    boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
  }

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    marginRight: 'auto',
  }

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <Link to="/" style={logoStyle}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #5b6af5, #f97316)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <ToolOutlined style={{ color: '#fff', fontSize: 18 }} />
          </div>
          <span style={{
            fontWeight: 800, fontSize: 20,
            background: 'linear-gradient(135deg, #5b6af5, #f97316)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            RanjanTools
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="desktop-nav" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 14,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(91,106,245,0.1)'; e.target.style.color = '#5b6af5' }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-primary)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 16 }}>
          {/* Language Toggle */}
          <Tooltip title={language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में बदलें'}>
            <button
              onClick={toggleLanguage}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 8,
                border: '1.5px solid var(--border)',
                background: 'transparent', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, color: 'var(--text-primary)',
                transition: 'all 0.2s'
              }}
            >
              <GlobalOutlined />
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
          </Tooltip>

          {/* Theme Toggle */}
          <Tooltip title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              style={{ background: theme === 'dark' ? '#5b6af5' : '#94a3b8' }}
            />
          </Tooltip>

          {/* Mobile Menu */}
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
        title={
          <span style={{ fontWeight: 800, color: '#5b6af5' }}>RanjanTools</span>
        }
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={280}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navLinks.map(link => (
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
              onMouseEnter={e => { e.target.style.background = 'rgba(91,106,245,0.1)' }}
              onMouseLeave={e => { e.target.style.background = 'transparent' }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={toggleLanguage} style={{
              padding: '8px 16px', borderRadius: 8, border: '1.5px solid var(--border)',
              background: 'transparent', cursor: 'pointer', fontWeight: 600,
              fontSize: 14, color: 'var(--text-primary)'
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

      {/* Spacer for fixed nav */}
      <div style={{ height: 64 }} />

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
