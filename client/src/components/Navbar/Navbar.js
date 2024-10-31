import React from 'react'
import { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import { Search } from '@mui/icons-material';

function Navbar() {
    
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="navbar">
            <Link to="/home">
            TWENDE
            </Link>
            <div className="desktopMenu">
                <ScrollLink
                    activeClass="active"
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="desktopMenuListItem"
                >
                    Home
                </ScrollLink>


                <ScrollLink
                    activeClass="active"
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="desktopMenuListItem"
                >
                    About Us
                </ScrollLink>
                <ScrollLink
                    activeClass="active"
                    to="container-discover"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="desktopMenuListItem"
                >
                    Discover
                </ScrollLink>
                <ScrollLink
                    activeClass="active"
                    to="stats-container"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="desktopMenuListItem"
                >
                    Why TUENDE ?
                </ScrollLink>
                <ScrollLink
                    activeClass="active"
                    to="values"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="desktopMenuListItem"
                >
                    Values & Vision
                </ScrollLink>
               
                
                
                
                <Link activeClass="active" to="/book" className="desktopMenuListItem customLink">Book Bus</Link>
                <Link activeClass="active" to="/contact" className="desktopMenuListItem customLink">Contact Us</Link>
                <Link activeClass="active" to="/login" className="desktopMenuListItem customLink">Log In</Link>




            </div>

            <Link to="/Signup" className="customLink">

                <button className="bg-skyblue text-mint font-bold py-2 px-4 w-40 h-15 mx-10 my-10 rounded-3xl hover:bg-white hover:text-mint"> <AccountCircleIcon /> Get Started</button>
            </Link>

            <div className="mobMenu">
                <Menu onClick={() => setShowMenu(!showMenu)} />
            </div>
            <div className="navMenu" style={{ display: showMenu ? "flex" : "none" }}>
                <Link activeClass="active" to="/home" className="listItem customLink">Home</Link>
              

                <ScrollLink
                    activeClass="active"
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    className="listItem"
                    onClick={() => setShowMenu(false)}
                >
                    About Us
                </ScrollLink>
            

                <Link activeClass="active" to="/book" className="listItem customLink">Book Bus</Link>
                <Link activeClass="active" to="/login" className="listItem customLink">Login</Link>
                <Link activeClass="active" to="/contact" className="listItem customLink">Contact Us</Link>


               



                <Link activeClass="active" to="/Signup" className="listItem customLink"> Get Started </Link>
            </div>
        </nav>
    );
}

export default Navbar