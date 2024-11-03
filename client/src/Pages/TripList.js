import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Grid2, Modal } from '@mui/material';
import SeatReservation from './SeatReservation';

const trips = [
    { id: 1, from: 'CBD', to: 'Karen', time: '12:30 PM (Afternoon)', price: 70, availableSeats: 5 },
    { id: 2, from: 'Westlands', to: 'CBD', time: '21:45 PM (Night)', price: 100, availableSeats: 7 },
    { id: 3, from: 'Karura', to: 'Parklands', time: '7:00 AM (Morning)', price: 50, availableSeats: 9 }
];

const TripList = () => {
    const [openSeatReservation, setOpenSeatReservation] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

    const handleSelectSeat = (trip) => {
        setSelectedTrip(trip);
        setOpenSeatReservation(true);
    };

    const handleClose = () => {
        setOpenSeatReservation(false);
        setSelectedTrip(null);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            {trips.map((trip) => (
                <Box key={trip.id} sx={{ marginBottom: 2, padding: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
                    <Grid2 container alignItems="center">
                        <Grid2 item xs={4} sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {trip.from} &nbsp;&mdash;&nbsp; {trip.to}
                            </Typography>
                            <Typography variant="subtitle1">{trip.time}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {trip.availableSeats} Available seats
                            </Typography>
                        </Grid2>
                        <Grid2 item xs={2}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                Ksh {trip.price.toFixed(2)}
                            </Typography>
                        </Grid2>
                        <Grid2 item xs={2} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" color="success" sx={{ color: 'white', borderRadius: '8px' }} onClick={() => handleSelectSeat(trip)}>
                                Select Seat
                            </Button>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 2 }} />
                </Box>
            ))}
            
            <Modal open={openSeatReservation} onClose={handleClose}>
                <Box sx={{ width: '80%', margin: 'auto', mt: 5, padding: 4, backgroundColor: 'white', borderRadius: '8px' }}>
                    <SeatReservation trip={selectedTrip} onClose={handleClose} />
                </Box>
            </Modal>
        </Box>
    );
};

export default TripList;