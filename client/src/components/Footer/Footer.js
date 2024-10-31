// Footer.js
import React from 'react';
import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
    return (
        <Box className="footer-container">
            <Grid container spacing={3} sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
                {/* Twende App Info */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Twende App
                    </Typography>
                    <Typography variant="body2">
                        Revolutionizing urban transportation. Book your bus rides easily and get to your destination on time with Twende!
                    </Typography>
                </Grid>

                {/* Links */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Quick Links
                    </Typography>
                    <Link href="/" underline="none">
                        Home
                    </Link>
                    <Link href="/bookings" underline="none">
                        Bookings
                    </Link>
                    <Link href="/contact" underline="none">
                        Contact Us
                    </Link>
                    <Link href="/profile" underline="none">
                        Your Profile
                    </Link>
                </Grid>

                {/* Social Media */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Connect with Us
                    </Typography>
                    <Box>
                        <IconButton href="https://facebook.com" target="_blank">
                            <Facebook />
                        </IconButton>
                        <IconButton href="https://twitter.com" target="_blank">
                            <Twitter />
                        </IconButton>
                        <IconButton href="https://instagram.com" target="_blank">
                            <Instagram />
                        </IconButton>
                        <IconButton href="https://linkedin.com" target="_blank">
                            <LinkedIn />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            <Box className="footer-bottom">
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} Twende App. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;