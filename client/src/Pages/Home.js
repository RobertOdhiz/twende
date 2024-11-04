import React from 'react'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Discover from '../components/Discover/Discover'
import Values from '../components/Values/Values'



function Home() {
  return (
    <div>
        <Hero />
        <About />
        <Discover />
        <Values />
    </div>
  )
}

export default Home