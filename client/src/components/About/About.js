import React from 'react';
import aboutImage from '../Assets/about.jpg';
import './About.css';

function About() {
    return (
        <div className='about-container'>
            <img src={aboutImage} alt="About Us" className='about-image'/>
            <div className='about-text'>
                <h2>About Twende</h2>
                <p>
                    <span className="highlight">Twende</span> is dedicated to providing fast, convenient, and reliable travel options. 
                    Our commitment is to ensure your journeys are smooth and enjoyable, connecting you to destinations efficiently and comfortably.
                </p>
                <p>
                    Whether you're commuting daily or exploring new places, we strive to enhance your experience at every step. 
                    Join us on this journey towards smarter, more efficient travel.
                </p>
                <button className="about-button">Learn More</button>
            </div>
        </div>
    );
}

export default About;