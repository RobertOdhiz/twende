import React from 'react';
// import BusMap from './components/BusMap';
import Home from './Pages/Home';
import './App.css';  // Import custom CSS file
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Book from './Pages/Book';
function App() {
    return (

        <div>
        <Router>
         <Navbar />

        <Routes>
         <Route path="/home" element={<Home />} />
         <Route path='/book' element={<Book />} />
          
        </Routes>
        

      </Router>
    
        </div>
    );
}

export default App;