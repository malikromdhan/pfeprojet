import React, { useState } from 'react';
import './navbar.css';
import logo from '../../images/tunisia.png';
import logo1 from '../../images/logo1.png';

const Navbar = () => {


  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className='container'>
          <img src={logo} alt='logo' />
          <p>Tunisian Republic Ministry of Higher Education and Scientific Research</p>
        </div>
        <hr className="separator" />
        <header>
          <div className='left'>
            <img src={logo1} alt='logo' />
            <div className="text-container">
              <p> Higher Institute of Applied Science and Technology Mahdia</p>
              <p>المعهد العالي للعلوم التطبيقية والتكنولوجية بالمهدية</p>
            </div>
          </div>
         
        </header>
      </nav>
     
    </div>
  )
};

export default Navbar;
