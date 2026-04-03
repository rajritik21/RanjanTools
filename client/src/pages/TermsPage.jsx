import React from 'react'
import { Link } from 'react-router-dom'

export default function TermsPage() {
  return (
    <div style={{ padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, display: 'block' }}>← Back to Home</Link>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Terms & Conditions</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>Last updated: April 2, 2026</p>
        {[
          { title: '1. Free to Use', text: 'RanjanTools is completely free to use. All tools are available without subscription, registration, or payment.' },
          { title: '2. Client-Side Processing', text: 'All file processing is done in your browser. We are not responsible for any data loss. Always keep backups of your important files.' },
          { title: '3. Acceptable Use', text: 'You may not use this platform to process illegal, copyrighted, or harmful content. We reserve the right to discontinue service for abuse.' },
          { title: '4. No Warranty', text: 'Tools are provided "as is" without warranty. We strive for accuracy but cannot guarantee results for all file types.' },
          { title: '5. Contact', text: 'For any questions, contact us at burabakk2241@gmail.com' },
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
