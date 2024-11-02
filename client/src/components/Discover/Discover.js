import React from 'react'
import aboutImage from '../Assets/about.jpg'
import './Discover.css'
import BookIcon from '@mui/icons-material/Book';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import RecommendIcon from '@mui/icons-material/Recommend';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

function Discover() {
  return (
    <div>
        <div className="container-discover">
            <img src={aboutImage} alt="" className='heroimage'/>
                    <div className="text-block">
                        <div className="vl"></div>
                        <h1>Discover A <br /> 
                            Smarter <br/>
                            Way To Ride.</h1>
                            <button className="bg-white text-mint font-lighter py-2 px-4 w-40 h-19 my-10 rounded-2xl hover:bg-mint hover:text-white translate-x-left-65%"> <BookIcon/> Book Now</button>
                            </div>
        </div>
        <div className='stats-container'>
        <h1>Why TUENDE?</h1>
            <div className='stats-cards'>
                <div className='stats-card'>
                <p><span className='numbers'><SsidChartIcon />
                Flexible</span><br /><span> Flexible pickup and drop-off points to suit your itinerary.</span></p>
                </div>
                <div className='stats-card'>
                    
                <p><span className='numbers'><QueryBuilderIcon />Save-Time</span><br /><span> Skip the traffic and travel efficiently with our electric buses.</span></p>
                </div>
                <div className='stats-card'>
                    
                <p><span className='numbers'> <RecommendIcon />Quality</span><br /><span> Experience the comfort and quietness of electric bus travel.</span></p>
                </div>
                <div className='stats-card'>
                    
                <p><span className='numbers'><SentimentVerySatisfiedIcon />Memorable</span><br /><span> Create unforgettable memories with your group on a unique electric bus tour.</span></p>
                </div>
            </div>
            </div>

    </div>
  )
}

export default Discover