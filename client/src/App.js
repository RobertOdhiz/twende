import React from 'react';
// import BusMap from './components/BusMap';
import Home from './Pages/Home';
import './App.css';  // Import custom CSS file
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
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
         <Footer />

      </Router>
    
        </div>
    );
}

export default App;