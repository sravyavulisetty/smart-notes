import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import SideBar from './components/SideBar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'


const ArchivePage = React.lazy(()=>import("./pages/ArchivePage"));

export default function App() {
  return (
    <div className='h-screen overflow-hidden'>
      <Header />
      <div className='flex'>
        <div className='w-[15%] bg-white min-h-screen p-4 text-black'>
          <SideBar />
        </div>
        <div className='flex-1 bg-gray-100 min-h-screen p-4 text-black rounded-md'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/archive' element={<ArchivePage/>} />
            <Route path='/settings' element={<div>Settings Page</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

