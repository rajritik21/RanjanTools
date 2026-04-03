import React from 'react'
import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <div style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, display: 'block' }}>← Back to Home</Link>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>Last updated: April 2, 2026</p>
        {[
          { title: '1. No Data Collection', text: 'RanjanTools processes all files entirely in your browser. Your images and PDFs are never transmitted to our servers. We cannot see, access, or store your files.' },
          { title: '2. What We Store', text: 'The only data we store is optional review/feedback submitted through the review form (your name and message). This is stored in our database to display community feedback.' },
          { title: '3. Cookies', text: 'We use localStorage (not cookies) to remember your preferred theme (dark/light) and language (Hindi/English). No tracking cookies are used.' },
          { title: '4. Third-Party Services', text: 'We use Google Fonts for typography. No analytics, advertising, or tracking scripts are loaded.' },
          { title: '5. Contact', text: 'For privacy concerns, email us at burabakk2241@gmail.com' },
        ].map(s => (
          <div key={s.title} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{s.title}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
