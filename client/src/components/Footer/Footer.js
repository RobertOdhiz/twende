import React from 'react'
import './Footer.css'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import MessageIcon from '@mui/icons-material/Message';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';

function Footer() {
  return (
  <footer>
    <div className='footer'>
        <div className="column">
          {/* <img src={FooterLogo} alt="" /> */}
        </div>
        <div className="column">
          <h4>Resources</h4>
          <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Get Started</li>
          </ul>
        </div>
        <div className="column">
          <h4>Find Us on Social media</h4>
          <ul>
            <li>X</li>
            <li>Instagram</li>
            <li>Youtube</li>
            <li>Linkedin</li>
          </ul>
        </div>
        <div className="column">
          <h4>Contact Us</h4>
          <ul>
            <li>Call Us</li>
            <li>Message Us</li>
            <li>Email Us</li>
          </ul>
        </div>
    </div>
    <p>&copy; 2024 Tuende.com</p>
  </footer>
  )
}

export default Footer