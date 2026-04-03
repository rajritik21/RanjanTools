const Review = require('../models/Review')

// @desc  Create a new review
// @route POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { name, message } = req.body

    if (!name || !message) {
      return res.status(400).json({ success: false, error: 'Name and message are required.' })
    }

    const review = await Review.create({ name, message })
    res.status(201).json({ success: true, data: review })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ success: false, error: errors.join(', ') })
    }
    res.status(500).json({ success: false, error: 'Server error. Please try again.' })
  }
}

// @desc  Get all reviews (newest first)
// @route GET /api/reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(50)
    res.status(200).json({ success: true, count: reviews.length, data: reviews })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error.' })
  }
}

module.exports = { createReview, getReviews }
