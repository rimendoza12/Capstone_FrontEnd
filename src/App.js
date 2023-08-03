import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import About from './components/About';
import Contact from './components/Contact';
import Packages from './components/Packages';
import Teacher from './components/Teacher';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Menu from './components/Menu';




function App() {

  const isAuthenticated = localStorage.getItem('login_token');

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/packages' element={<Packages />}/>
        <Route path='/teacher' element={<Teacher />}/>
        <Route path='/menu' element={isAuthenticated ? <Menu /> : <Navigate to='/login'/>}/>
        <Route path='/dashboard/*' element={isAuthenticated ? <Menu /> : <Navigate to='/login'/>}/>
        <Route path='/cart' element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}/>
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
