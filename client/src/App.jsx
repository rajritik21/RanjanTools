import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider, theme as antTheme } from 'antd'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import PdfToJpgPage from './pages/tools/PdfToJpgPage'
import JpgToPngPage from './pages/tools/JpgToPngPage'
import ImageResizerPage from './pages/tools/ImageResizerPage'
import ProfilePicturePage from './pages/tools/ProfilePicturePage'
import IdCardJoinerPage from './pages/tools/IdCardJoinerPage'
import DateOnPhotoPage from './pages/tools/DateOnPhotoPage'
import PdfMergerPage from './pages/tools/PdfMergerPage'
import ImageConverterPage from './pages/tools/ImageConverterPage'
import ImageCompressorPage from './pages/tools/ImageCompressorPage'
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
              <Route path="/" element={<HomePage />} />
              <Route path="/tools/pdf-to-jpg" element={<PdfToJpgPage />} />
              <Route path="/tools/jpg-to-png" element={<JpgToPngPage />} />
              <Route path="/tools/image-resizer" element={<ImageResizerPage />} />
              <Route path="/tools/profile-picture" element={<ProfilePicturePage />} />
              <Route path="/tools/id-card-joiner" element={<IdCardJoinerPage />} />
              <Route path="/tools/date-on-photo" element={<DateOnPhotoPage />} />
              <Route path="/tools/pdf-merger" element={<PdfMergerPage />} />
              <Route path="/tools/image-converter" element={<ImageConverterPage />} />
              <Route path="/tools/image-compressor" element={<ImageCompressorPage />} />
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
