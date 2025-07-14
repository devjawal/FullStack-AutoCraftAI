import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950">
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonial />
      <Plan />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

export default Home
