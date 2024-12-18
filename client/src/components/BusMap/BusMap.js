import React, { useEffect, useState, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import 'leaflet-routing-machine';
import { LocationOn, MyLocation } from '@mui/icons-material';
import { Box, TextField, Button, Typography, Paper, Autocomplete, Fab } from '@mui/material';
import { fetchData } from '../../utils/dataHandler';
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

const getLocationName = async (lat, lon) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
                lat,
                lon,
                format: 'json'
            }
        });
        return response.data.display_name;
    } catch (error) {
        console.error('Error fetching location name:', error);
        return `${lat}, ${lon}`;
    }
};

const BusMap = () => {
    const [locations, setLocations] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [pickupLocation, setPickupLocation] = useState(null);
    const [dropOffLocation, setDropOffLocation] = useState(null);
    const [busLocations, setBusLocations] = useState([]);
    const [pickupStations, setPickupStations] = useState([]);
    const mapRef = useRef(null);
    const routingControlRef = useRef(null);
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userLocation && dropOffLocation) {
            navigate('/trip-list'); 
        }
    };


    const predefinedLocations = [
        { name: 'Karen', coords: [-1.2921, 36.8219] },
        { name: 'Westlands', coords: [-1.2683, 36.8111] },
        { name: 'CBD', coords: [-1.2833, 36.8219] },
    ];

    useEffect(() => {
        const fetchData = async () => {
            await fetchData('/locations/').then(res => {
                const filteredLocations = res.data || [];
                setLocations(filteredLocations);

                setBusLocations(filteredLocations.filter(location => location.type === 'driver'));
                setPickupStations(filteredLocations.filter(location => location.type === 'stage'));
            }).catch(err => console.error('Error fetching locations: ', err));
        };

        fetchData();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    if (latitude && longitude) {
                        setUserLocation([latitude, longitude]);
                        const locationName = await getLocationName(latitude, longitude);
                        setPickupLocation(locationName);
                    } else {
                        console.warn("Invalid user coordinates.");
                    }
                },
                (error) => console.log('Error getting user location:', error)
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (userLocation && dropOffLocation && mapRef.current) {
            if (!userLocation[0] || !userLocation[1] || !dropOffLocation[0] || !dropOffLocation[1]) {
                console.warn("Invalid coordinates for routing.");
                return;
            }

            if (routingControlRef.current) {
                mapRef.current.removeControl(routingControlRef.current);
            }
            routingControlRef.current = L.Routing.control({
                waypoints: [
                    L.latLng(userLocation[0], userLocation[1]),
                    L.latLng(dropOffLocation[0], dropOffLocation[1])
                ],
                lineOptions: {
                    styles: [{ color: '#003135', weight: 6 }]
                },
                createMarker: () => null
            }).addTo(mapRef.current);
        }
    }, [userLocation, dropOffLocation]);

    const handleDropOffChange = (event, value) => {
        const location = predefinedLocations.find(loc => loc.name === value);
        if (location && location.coords) {
            setDropOffLocation(location.coords);
        } else {
            console.warn("Drop-off location not found or invalid.");
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (userLocation && dropOffLocation) {
    //         console.log('Booking confirmed from', userLocation, 'to', dropOffLocation);
    //     }
    // };

    const handleGetLocation = () => {
        if (userLocation && mapRef.current) {
            const map = mapRef.current;
            map.setView(userLocation, 15);
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f0f4f8' }}>
            <Paper elevation={3} sx={{width: '30%',p: 4,display: 'flex',flexDirection: 'column',gap: 3,backgroundColor: '#ffffff',borderRadius: '16px',ml: 2,mt: 2,mb: 2,boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',}}>
                <Typography variant="h5" gutterBottom sx={{ color: '#003135', fontWeight: 'bold' }}>
                    Tuende
                </Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField label="Pick-up Location" variant="outlined" fullWidth value={pickupLocation || ''} InputProps={{ readOnly: true }} />
                    <Autocomplete options={predefinedLocations.map(loc => loc.name)} onChange={handleDropOffChange} renderInput={(params) => <TextField {...params} label="Drop-off Location" variant="outlined" />} />
                    <Button type="submit" variant="contained" fullWidth sx={{mt: 2,backgroundColor: '#003135',color: 'white',transition: 'background-color 0.3s ease, transform 0.2s ease','&:hover': { backgroundColor: '#004e5f', transform: 'scale(1.05)' },borderRadius: '8px',padding: '10px',fontSize: '16px',}}>
                        Book Now
                    </Button>
                </form>
            </Paper>

            <Box sx={{ flex: 1,position: 'relative',borderRadius: '16px',overflow: 'hidden',margin: '16px',}}>
                <MapContainer center={userLocation || [0, 0]} zoom={13} style={{ height: "80vh", width: "80vw", borderRadius: '16px' }} zoomControl={false} ref={mapRef} >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ZoomControl position="topright" />
                    {userLocation && (
                        <LocationMarker position={userLocation} label="Pick-up" color="#1976d2" />
                    )}
                    {dropOffLocation && (
                        <LocationMarker position={dropOffLocation} label="Drop-off" color="green" />
                    )}
                    {busLocations.map((location, index) => (
                        <BusMarker key={index} position={[location.latitude, location.longitude]} name={location.type} />
                    ))}
                </MapContainer>
                <Fab color="primary" aria-label="locate" onClick={handleGetLocation}
                    sx={{position: 'absolute',bottom: 16,right: 16,backgroundColor: '#004e5f',color: 'white','&:hover': { backgroundColor: '#003135' }}}
                >
                    <MyLocation />
                </Fab>
            </Box>
        </Box>
    );
};

export default BusMap;