import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

export const submitReview = (data) => api.post('/reviews', data)
export const getReviews = () => api.get('/reviews')

export default api
