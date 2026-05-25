import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider, theme as antTheme } from 'antd'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ToolPage from './pages/tools/ToolPage'
import CategoryPage from './pages/CategoryPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import useStore from './store/useStore'

export default function App() {
  const { theme } = useStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#5b6af5',
          borderRadius: 12,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }
      }}
    >
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Dynamic tool pages — ONE route for ALL tools */}
              <Route path="/tools/:slug" element={<ToolPage />} />

              {/* Category pages — auto-populated from config */}
              <Route path="/pdf-tools" element={<CategoryPage categoryId="pdf" />} />
              <Route path="/image-tools" element={<CategoryPage categoryId="image" />} />
              <Route path="/smart-utilities" element={<CategoryPage categoryId="utility" />} />

              {/* Legal */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ConfigProvider>
  )
}
