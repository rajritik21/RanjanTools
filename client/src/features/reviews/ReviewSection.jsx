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
    <section id="reviews" className="section" style={{
      background: '#0a0f1d',
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0)`,
      backgroundSize: '40px 40px',
      position: 'relative',
      overflow: 'hidden',
      padding: '80px 0'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ 
            fontSize: 'max(2.5rem, 40px)', 
            fontWeight: 900, 
            letterSpacing: '-0.02em',
            margin: 0,
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.3))'
          }}>
            Your Reviews Matter
          </h2>
          <p style={{ 
            color: '#94a3b8', 
            fontSize: 18, 
            marginTop: 12,
            fontWeight: 500
          }}>
            Your reviews and suggestions help me improve!
          </p>
        </div>

        <div style={{
          maxWidth: 650,
          margin: '0 auto',
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: 24,
          padding: 40,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.1)'
        }}>
          <h3 style={{ 
            color: '#fff', 
            fontSize: 22, 
            fontWeight: 700, 
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <span role="img" aria-label="pen"></span> Write to Developer
          </h3>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input
                placeholder="Your Name"
                size="large"
                style={{ 
                  background: 'rgba(15, 23, 42, 0.6)', 
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  borderRadius: 12,
                  height: 56,
                  fontSize: 16
                }}
              />
            </Form.Item>

            <Form.Item
              name="message"
              rules={[{ required: true, message: 'Please write your review' }]}
            >
              <TextArea
                placeholder="Write your message or review here..."
                rows={5}
                style={{ 
                  background: 'rgba(15, 23, 42, 0.6)', 
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  borderRadius: 12,
                  fontSize: 16,
                  padding: 16
                }}
              />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <Form.Item name="rating" initialValue={5} style={{ marginBottom: 0 }}>
                <Rate 
                  style={{ 
                    fontSize: 32,
                    color: '#f59e0b'
                  }} 
                />
              </Form.Item>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              style={{
                width: '100%', 
                borderRadius: 12, 
                height: 60,
                fontWeight: 700, 
                fontSize: 18,
                background: '#1e293b',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12
              }}
            >
              Send Directly to Ritik <SendOutlined />
            </Button>
          </Form>
        </div>

        {reviews.length > 0 && (
          <div style={{ marginTop: 64, textAlign: 'center' }}>
            <h4 style={{ color: '#64748b', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Recent Feedback</h4>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
              {reviews.slice(0, 3).map((r, i) => (
                <div key={r._id || i} style={{
                  background: 'rgba(30, 41, 59, 0.4)',
                  padding: '16px 24px',
                  borderRadius: 16,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  maxWidth: 300,
                  textAlign: 'left'
                }}>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: 14 }}>{r.name}</div>
                  <Rate disabled defaultValue={r.rating || 5} style={{ fontSize: 10, margin: '4px 0' }} />
                  <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {r.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        #reviews .ant-input, #reviews textarea {
          transition: all 0.3s ease;
        }
        #reviews .ant-input::placeholder, 
        #reviews textarea::placeholder {
          color: #64748b !important;
        }
        #reviews .ant-input:focus, #reviews textarea:focus {
          background: rgba(15, 23, 42, 0.8) !important;
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2) !important;
        }
        #reviews .ant-btn-primary:hover {
          background: #334155 !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5) !important;
        }
        #reviews .ant-rate-star:not(:last-child) {
          margin-right: 12px !important;
        }
        #reviews .ant-rate-star-second {
          color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  )
}
