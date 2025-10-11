import React from 'react'
import AmazonLogo from '../images/amazon.png'
import { Search } from 'react-bootstrap-icons'
import {  Link } from 'react-router-dom'

function Header() {
 
  return (
    <header className="bg-dark text-white text-center py-3">
      <h1 className="mb-0">Amazon Clone</h1>
      <Link to="/" className="d-block mb-2">
        <img src={AmazonLogo} alt="Amazon Logo" style={{ width: '150px', height: '50px' }} />
      </Link>
      <div className='header-search' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        <input type="text" placeholder="Search Amazon" />
        <button type="submit" className="btn btn-warning">
          <Search />
        </button>
      </div>
        <div className="mt-3">
            <button className="btn btn-primary me-2" >Login</button>
            <button className="btn btn-secondary" >Sign Up</button>
        </div>
    </header>
  )
}

export default Header
