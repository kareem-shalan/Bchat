import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './../NavBar/NavBar';
import Footer from './../Footer/Footer';

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className='container mx-auto overflow-hidden min-h-screen flex flex-col justify-center items-center'>

        <Outlet />
      </div>
    {/*  <Footer /> */}

    </>
  )
}
