import React from 'react';
import Home from './Pages/Home';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Book from './Pages/Book';
import TripList from './Pages/TripList';

function App() {
    return (

        <div>
          <Router>
           <Navbar />
            <Routes>
             <Route path="/home" element={<Home />} />
             <Route path='/book' element={<Book />} /> 
             <Route path='/trip-list' element={<TripList />} />
            </Routes>
           <Footer />
          </Router>
        </div>
    );
}

export default App;