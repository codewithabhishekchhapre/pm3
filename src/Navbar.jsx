import React from 'react'
import './App.css'
import { NavLink, Outlet } from 'react-router-dom'

function Navbar() {
  return (
     <>
     
    <div className='navbar'>
          <div className="logo">
               <h1>Logo.</h1>
          </div>
          <div className="menu">
               <ul>
                    <NavLink to={"/"}>

                    <li>Home</li>
                    </NavLink>
                    <li>about</li>
                    <li>contact</li>
                    <li>services</li>
               </ul>
          </div>
          <div className="btn">
               <button>register</button>
               <NavLink to={"/login"}>

               <button>login</button>
               </NavLink>
          </div>
    </div>
    <Outlet/>
    </>
  )
}

export default Navbar

