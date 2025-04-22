import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Navbar from "./Navbar"
import LandingPage from './components/batch_react/LandingPage'
import QuoteCard from './QuoteCard'
import Dashboard from './dashboard/Dashboard'
import Jobpost from './dashboard/Jobpost'
import AttendanceTable from './dashboard/AttendanceTable'
import UserList from './components/UserList '
import Details from './components/Details'
import Createcourse from './components/Course/Createcourse'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navbar/>}>
         <Route index element={<LandingPage/>}/>
         <Route path='/login' element={<Login/>} />
         <Route path='/details/:id' element={<Details/>} />
         
         <Route path='/quote' element={<QuoteCard/>} />
         <Route path='/course' element={<Createcourse/>} />
         <Route path="/user" element={<UserList/>}/>
         <Route path='/dashboard' element={<Dashboard/>}>
         <Route path='jobpost' element={<Jobpost/>} />
         <Route path='attendance' element={<AttendanceTable/>} />
         </Route>
      </Route>
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App