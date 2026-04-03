import React from 'react'
import { useTranslation } from 'react-i18next'
import { Collapse } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { Panel } = Collapse

export default function FaqSection() {
  const { t } = useTranslation()

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ]

  return (
    <section id="faq" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <div className="section-header">
          <span className="overline">FAQ</span>
          <h2>{t('faq.title')}</h2>
          <p>{t('faq.subtitle')}</p>
        </div>

        <Collapse
          accordion
          bordered={false}
          expandIconPosition="end"
          style={{
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          {faqs.map((faq, i) => (
            <Panel
              key={i}
              header={
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600, fontSize: 15 }}>
                  <QuestionCircleOutlined style={{ color: '#5b6af5', fontSize: 18 }} />
                  {faq.q}
                </div>
              }
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px !important',
                marginBottom: 0
              }}
            >
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontSize: 14,
                paddingLeft: 30
              }}>
                {faq.a}
              </p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </section>
  )
}
