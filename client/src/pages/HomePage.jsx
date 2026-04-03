import React from 'react'
import HeroSection from '../features/home/HeroSection'
import ToolsGrid from '../features/home/ToolsGrid'
import AboutSection from '../features/home/AboutSection'
import ReviewSection from '../features/reviews/ReviewSection'
import FaqSection from '../features/home/FaqSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ToolsGrid />
      <AboutSection />
      <ReviewSection />
      <FaqSection />
    </>
  )
}
