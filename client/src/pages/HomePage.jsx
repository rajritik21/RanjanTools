import React from 'react'
import HeroSection from '../features/home/HeroSection'
import CategorySection from '../features/home/CategorySection'
import AboutSection from '../features/home/AboutSection'
import ReviewSection from '../features/reviews/ReviewSection'
import FaqSection from '../features/home/FaqSection'

export default function HomePage() {
  return (
    <>
      {/* Hero — unchanged */}
      <HeroSection />

      {/* Popular Tools — 6 featured tools from any category */}
      <CategorySection
        id="tools"
        categoryId="popular"
        title="Popular Tools"
        subtitle="Most-used tools by students and aspirants — free, instant, no sign-up."
        viewAllPath="/pdf-tools"
        viewAllLabel="View All Tools"
      />

      {/* PDF Tools Section */}
      <CategorySection
        categoryId="pdf"
        subtitle="Convert, merge, compress and manage PDF files — all in your browser."
        viewAllPath="/pdf-tools"
        viewAllLabel="Explore PDF Tools"
        dark
      />

      {/* Image Tools Section */}
      <CategorySection
        categoryId="image"
        subtitle="Resize, compress, convert and enhance images for any requirement."
        viewAllPath="/image-tools"
        viewAllLabel="Explore Image Tools"
      />

      {/* Smart Utilities Section */}
      <CategorySection
        categoryId="utility"
        subtitle="Build resumes, biodata, and official documents in minutes — for free."
        viewAllPath="/smart-utilities"
        viewAllLabel="Explore Smart Utilities"
        dark
      />

      {/* About — unchanged */}
      <AboutSection />

      {/* Reviews — unchanged */}
      <ReviewSection />

      {/* FAQ — unchanged */}
      <FaqSection />
    </>
  )
}
