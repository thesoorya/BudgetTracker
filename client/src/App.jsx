import React from 'react'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard';
import Auth from './pages/Auth/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Transaction from './pages/Transaction/Transaction';

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <div style={{padding: '3%'}}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/transactions' element={<Transaction />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App