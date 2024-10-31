import React from 'react';
import heroImage from '../Assets/heroimage.jpg';
import './Hero.css';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className='container-home' id='home'>
            <img src={heroImage} alt="" className='heroimage'/>
            <div className="overlay-gradient"></div> {/* Gradient Overlay */}
            <div className="herotext">
                <h1>TUENDE</h1>
                <p className="tagline" id='tagline'> Fast, Convenient, <span>Reliable</span></p>
                <Link to='/book'>
                    <button className="bg-skyblue text-mint font-bold py-2 px-4 w-40 h-15 mx-10 my-10 rounded-2xl hover:bg-white hover:text-mint">Book Now</button>
                </Link>
            </div>
        </div>
    );
}

export default Hero;