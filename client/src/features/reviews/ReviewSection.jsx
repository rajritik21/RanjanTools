import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, Card, Rate, Avatar } from 'antd'
import { SendOutlined, UserOutlined, StarFilled } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { submitReview, getReviews } from '../../services/api'

const { TextArea } = Input

export default function ReviewSection() {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getReviews()
      .then(res => setReviews(res.data.data || []))
      .catch(() => {})
  }, [])

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      await submitReview(values)
      message.success(t('reviews.success'))
      form.resetFields()
      // Refresh reviews
      const res = await getReviews()
      setReviews(res.data.data || [])
    } catch {
      message.error(t('reviews.error'))
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ['#5b6af5', '#f97316', '#22c55e', '#ec4899', '#14b8a6', '#8b5cf6']

  return (
    <section id="reviews" className="section">
      <div className="container">
        <div className="section-header">
          <span className="overline">REVIEWS</span>
          <h2>{t('reviews.title')}</h2>
          <p>{t('reviews.subtitle')}</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          alignItems: 'start'
        }}>
          {/* Review Form */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 20,
            padding: 36,
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>
              ✍️ Write a Review
            </h3>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#5b6af5' }} />}
                  placeholder={t('reviews.namePlaceholder')}
                  size="large"
                  style={{ borderRadius: 10 }}
                />
              </Form.Item>
              <Form.Item
                name="message"
                rules={[{ required: true, message: 'Please write your review' }]}
              >
                <TextArea
                  placeholder={t('reviews.messagePlaceholder')}
                  rows={5}
                  style={{ borderRadius: 10 }}
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SendOutlined />}
                size="large"
                style={{
                  width: '100%', borderRadius: 10, height: 48,
                  fontWeight: 600, fontSize: 15
                }}
              >
                {t('reviews.submit')}
              </Button>
            </Form>
          </div>

          {/* Reviews Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {reviews.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: 40,
                color: 'var(--text-muted)', fontSize: 15
              }}>
                <StarFilled style={{ fontSize: 40, color: '#fbbf24', marginBottom: 12, display: 'block' }} />
                Be the first to leave a review! ⭐
              </div>
            ) : (
              reviews.slice(0, 4).map((r, i) => (
                <div key={r._id || i} style={{
                  background: 'var(--bg-card)',
                  borderRadius: 16, padding: 20,
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                    <Avatar
                      style={{ background: COLORS[i % COLORS.length], fontWeight: 700 }}
                      size={40}
                    >
                      {r.name?.[0]?.toUpperCase()}
                    </Avatar>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{r.name}</div>
                      <Rate disabled defaultValue={5} style={{ fontSize: 12 }} />
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
                    "{r.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #reviews .container > div > div:first-child + div {
            display: none;
          }
          #reviews .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
