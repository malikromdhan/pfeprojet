import { useState } from 'react';
import './App.css';
import Navbar from './component/navbar/Navbar';
import LoginPage from './component/login/login';


import Dashboardadmin from './component/dashboardadmin/dashboardadmin';
import Dashboardprof from './component/dashboardprof/dashboardprof'; // Importer le composant de tableau de bord du professeur

import DashboardEtudiant from './component/dashboardetudiant/dashboardetudiant';

import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const navig = () => {
    setIsLoggedIn(true); // Set isLoggedIn to true when navigating to dashboard
  }

  return (
    <>
    <BrowserRouter>
      <div>
        <Navbar />
        {/* Use Routes to define your application routes */}
        <Routes>
           {/* Define route for the dashboard d'etudiant */}
           <Route path="/DashboardEtudiant" element={<DashboardEtudiant />} />

          {/* Define route for the dashboard */}
          <Route path="/Dashboardadmin" element={<Dashboardadmin />} />

          {/* Define route for the dashboard du professeur */}
          <Route path="/Dashboardprof" element={<Dashboardprof />} />

          {/* Define route for the login page */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/Dashboardadmin" /> : <LoginPage />} />
        </Routes>
        {/* Conditionally render the buttons based on login status */}
        {!isLoggedIn && (
          <>
            <button onClick={navig}>
              Dashboardadmin
            </button>
            <button>
              <Link to="/Dashboardprof">Dashboardprof</Link> {/* Utiliser Link pour naviguer vers Dachboardprof */}
            </button>
            <button>
              <Link to="/DashboardEtudiant">Dachboardetudiant</Link> {/* Utiliser Link pour naviguer vers Dachboardetudiant*/}
            </button>
          </>
        )}
      </div>
    </BrowserRouter>
    </>
  )
}

export default App;
