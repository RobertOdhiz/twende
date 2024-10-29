import React from 'react'
import './About.css'
import aboutImage from '../Assets/about.jpg'

function About() {
  return (
    <div className='about'>
    <h1>About Us</h1>
    <p>At TUENDE, we are redefining city transportation with convenience, 
affordability, and reliability at the heart of everything we do. 
Our mission is to provide seamless, on-demand bus services that cater to your 
urban mobility needs, offering a smart, eco-friendly, and comfortable alternative
 to traditional commuting options.
With our user-friendly app, you can easily book a ride, track your bus in real time,
 and enjoy a hassle-free journey to your destination. 
Whether you’re heading to work, running errands, or exploring the city,
 TUENDE is here to make your travel experience efficient 
 enjoyable.</p>
 <div className="discover">
        <img src={aboutImage} alt="" className='heroimage'/>
            <div className="abouttext">
                <h1>Discover A Smarter Way To Ride</h1>
                <button>Book Now</button>
            </div>
 </div>


    </div>
  )
}

export default About