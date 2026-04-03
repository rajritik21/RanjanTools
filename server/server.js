const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const reviewRoutes = require('./routes/reviewRoutes')
const errorHandler = require('./middleware/errorHandler')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ── Connect to MongoDB ──────────────────────────────────
connectDB()

// ── Middleware ──────────────────────────────────────────
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ── Health check ────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'RanjanTools API is running 🚀' })
})

// ── API Routes ──────────────────────────────────────────
app.use('/api/reviews', reviewRoutes)

// ── Catch-all for unknown routes ────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
})

// ── Error Handler ────────────────────────────────────────
app.use(errorHandler)

// ── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
