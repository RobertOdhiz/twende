import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="navbar">
            <Link to="/home" className="logo">
                TWENDE
            </Link>

            <div className="desktopMenu">
                {['home', 'about', 'discover', 'whytwende', 'values', 'vision'].map((section, index) => (
                    <ScrollLink
                        key={index}
                        activeClass="active"
                        to={section}
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                        className="desktopMenuListItem"
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1).replace(/_/g, ' ')}
                    </ScrollLink>
                ))}
                <Link to="/book" className="desktopMenuListItem customLink">Book Bus</Link>
                <Link to="/contact" className="desktopMenuListItem customLink">Contact Us</Link>
                <Link to="/login" className="desktopMenuListItem customLink">Log In</Link>
            </div>

            <Link to="/Signup" className="getStartedBtn">
                <button className="customButton">
                    <AccountCircleIcon /> Get Started
                </button>
            </Link>

            <div className="mobMenu">
                {showMenu ? (
                    <CloseIcon onClick={() => setShowMenu(false)} />
                ) : (
                    <MenuIcon onClick={() => setShowMenu(true)} />
                )}
            </div>

            <div className={`navMenu ${showMenu ? "show" : ""}`}>
                {['home', 'about', 'discover', 'whytwende', 'values', 'vision'].map((section, index) => (
                    <ScrollLink
                        key={index}
                        activeClass="active"
                        to={section}
                        spy={true}
                        smooth={true}
                        offset={-50}
                        duration={500}
                        className="listItem"
                        onClick={() => setShowMenu(false)}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </ScrollLink>
                ))}
                <Link to="/book" className="listItem customLink" onClick={() => setShowMenu(false)}>Book Bus</Link>
                <Link to="/login" className="listItem customLink" onClick={() => setShowMenu(false)}>Log In</Link>
                <Link to="/contact" className="listItem customLink" onClick={() => setShowMenu(false)}>Contact Us</Link>
                <Link to="/Signup" className="listItem customLink" onClick={() => setShowMenu(false)}>Get Started</Link>
            </div>
        </nav>
    );
}

export default Navbar;