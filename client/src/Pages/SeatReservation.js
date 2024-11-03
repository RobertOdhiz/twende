import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';

const rows = 8;
const columns = 4;

const generateSeatLayout = () => {
    let layout = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push({ row: i, col: j, isSelected: false });
        }
        layout.push(row);
    }
    return layout;
};

const SeatReservation = ({ trip, onClose }) => {
    const [seats, setSeats] = useState(generateSeatLayout());

    const handleSeatClick = (row, col) => {
        const updatedSeats = seats.map((seatRow, i) =>
            seatRow.map((seat, j) =>
                i === row && j === col
                    ? { ...seat, isSelected: !seat.isSelected }
                    : seat
            )
        );
        setSeats(updatedSeats);
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#003135', fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                {trip ? `Select Seats for ${trip.from} to ${trip.to}` : 'Select Seats'}
            </Typography>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                {seats.map((seatRow, rowIndex) => (
                    <Grid container item key={rowIndex} spacing={1} justifyContent="center">
                        {seatRow.map((seat, colIndex) => (
                            <Grid item key={`${rowIndex}-${colIndex}`}>
                                <Paper onClick={() => handleSeatClick(rowIndex, colIndex)} sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: seat.isSelected ? '#004e5f' : '#e0e0e0', color: seat.isSelected ? 'white' : 'black', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.3s ease', }} >
                                    {String.fromCharCode(65 + rowIndex)}{colIndex + 1}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button variant="contained" sx={{ backgroundColor: '#003135', color: 'white', '&:hover': { backgroundColor: '#004e5f' }, }} onClick={onClose} >
                    Confirm Selection
                </Button>
            </Box>
        </Box>
    );
};

export default SeatReservation;