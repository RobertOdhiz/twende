import React from 'react';
import BusMap from './components/BusMap';
import './App.css';  // Import custom CSS file

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Tuende</h1>
            </header>
            <div className="map-container">
                <BusMap />
            </div>
        </div>
    );
}

export default App;