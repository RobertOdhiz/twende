import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { LocationOn } from '@mui/icons-material';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import './BusMap.css';

const BusIconSVG = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="0" width="24" height="36" fill="#808080" rx="5" ry="5"/>
        <rect x="10" y="2" width="16" height="10" fill="white" rx="2"/>
        <rect x="10" y="24" width="16" height="10" fill="white" rx="2"/>
        <circle cx="10" cy="32" r="3" fill="#003135"/>
        <circle cx="26" cy="32" r="3" fill="#003135"/>
        <circle cx="10" cy="4" r="3" fill="#003135"/>
        <circle cx="26" cy="4" r="3" fill="#003135"/>
    </svg>
);

const LocationIcon = ({ color }) => (
    <LocationOn style={{ fontSize: 36, color }} />
);

const BusMarker = ({ position, name }) => {
    const customIcon = L.divIcon({
        className: 'custom-bus-icon',
        html: ReactDOMServer.renderToString(<BusIconSVG />),
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });

    return (
        <Marker position={position} icon={customIcon}>
            <Popup>{name}</Popup>
        </Marker>
    );
};

const LocationMarker = ({ position, label, color }) => {
    const customIcon = L.divIcon({
        className: 'custom-location-icon',
        html: ReactDOMServer.renderToString(<LocationIcon color={color} />),
        iconSize: [36, 36],
        iconAnchor: [18, 36]
    });

    return (
        <Marker position={position} icon={customIcon}>
            <Popup>{label}</Popup>
        </Marker>
    );
};

const BusMap = () => {
    const [busLocations, setBusLocations] = useState([
        { id: 1, position: [-1.2921, 36.8219], name: "Bus 1" },
        { id: 2, position: [-1.2935, 36.8235], name: "Bus 2" },
    ]);
    const [pickupLocation, setPickupLocation] = useState([-1.2921, 36.8219]);
    const [dropOffLocation, setDropOffLocation] = useState(null);
    const [userLocation, setUserLocation] = useState('');

    useEffect(() => {
        const updateBusLocations = () => {
            const updatedLocations = [
                { id: 1, position: [-1.2935, 36.8235], name: "Bus 1" },
                { id: 2, position: [-1.2950, 36.8250], name: "Bus 2" }
            ];
            setBusLocations(updatedLocations);
        };

        const interval = setInterval(updateBusLocations, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleLocationChange = (e) => {
        setUserLocation(e.target.value);
    };
    const handlePickupChange = (e) => {
        setPickupLocation(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userLocation) {
            const coords = getCoordinatesFromLocation(userLocation);
            if (coords) {
                setDropOffLocation(coords);
            }
        }
    };

    const getCoordinatesFromLocation = (location) => {
        return location === 'Karen' ? [-1.2921, 36.8219] : null; // Mock example
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f0f4f8' }}>
            {/* Sidebar */}
            <Paper elevation={3} sx={{
                width: '30%',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                ml: 2,
                mt: 2,
                mb: 2,
            }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#003135' }}>
                    Tuende
                </Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField
                        label="Pick-up Location"
                        variant="outlined"
                        fullWidth
                        value={pickupLocation}
                        onChange={handlePickupChange}
                    />
                    <TextField
                        label="Drop-off Location"
                        variant="outlined"
                        fullWidth
                        value={userLocation}
                        onChange={handleLocationChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            backgroundColor: '#003135',
                            color: 'white',
                            '&:hover': { backgroundColor: '#004e5f' },
                            borderRadius: '8px',
                            padding: '10px',
                            fontSize: '16px'
                        }}
                    >
                        Book Now
                    </Button>
                </form>
            </Paper>

            {/* Map Container */}
            <Box sx={{
                flex: 1,
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                margin: '16px',
            }}>
                <MapContainer
                    center={pickupLocation}
                    zoom={13}
                    style={{ height: "100%", width: "100%", borderRadius: '12px' }}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />
                    <ZoomControl position="topright" />
                    {dropOffLocation && (
                        <Polyline
                            positions={[pickupLocation, dropOffLocation]}
                            pathOptions={{ color: '#003135', weight: 5, dashArray: '5, 10' }}
                        />
                    )}
                    <LocationMarker position={pickupLocation} label="Pick-up" color="#1976d2" />
                    {dropOffLocation && (
                        <LocationMarker position={dropOffLocation} label="Drop-off" color="red" />
                    )}
                    {busLocations.map(bus => (
                        <BusMarker key={bus.id} position={bus.position} name={bus.name} />
                    ))}
                </MapContainer>
            </Box>
        </Box>
    );
};

export default BusMap;