import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Navbar from "./Navbar"
import OtpVerification from './OtpVerification'
import PropertyTable from '../src/components/PropertyTable ';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropertyListing from './components/PropertyListing '

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verification' element={<OtpVerification />} />
          <Route path='/property' element={<PropertyTable />} />
          <Route path='/approveproperty' element={<PropertyListing />} />
          </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App