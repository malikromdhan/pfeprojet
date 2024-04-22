import { useState } from 'react';
import './App.css';
import Navbar from './component/navbar/Navbar';
import LoginPage from './component/login/login';
import Dachboardetudiant from './component/DACHBOARDETUDIANT/dachboardetudiant';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const malik = () => {
    setIsLoggedIn(true); // Set isLoggedIn to true when navigating to dashboard
  }

  return (
    <>
    <BrowserRouter>
      <div>
        <Navbar />
        {/* Use Routes to define your application routes */}
        <Routes>
          {/* Define route for the dashboard */}
          <Route path="/dachboardetudiant" element={<Dachboardetudiant />} />
          {/* Define route for the login page */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/dachboardetudiant" /> : <LoginPage />} />
        </Routes>
        {/* Conditionally render the button based on login status */}
        {!isLoggedIn && (
          <button onClick={malik}>
            Dachboardetudiant
          </button>
        
        )}
      </div>
     
    </BrowserRouter>
     </>
  )
}

export default App;
