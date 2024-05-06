
import './App.css';
import Navbar from './component/navbar/Navbar';
import LoginPage from './component/login/login';


import Dashboardadmin from './component/dashboardadmin/dashboardadmin';
import Dashboardprof from './component/dashboardprof/dashboardprof'; // Importer le composant de tableau de bord du professeur

import DashboardEtudiant from './component/dashboardetudiant/dashboardetudiant';

import { BrowserRouter, Routes, Route,} from 'react-router-dom';




function App() {
  

 

  return (
    <>
    <BrowserRouter>
      <div>
        <Navbar />
        {/* Use Routes to define your application routes */}
        <Routes>
           {/* Define route for the dashboard d'etudiant */}
           <Route path="/Dashboard/student" element={<DashboardEtudiant />} />

          {/* Define route for the dashboard */}
          <Route path="/Dashboard/admin" element={<Dashboardadmin />} />

          {/* Define route for the dashboard du professeur */}
          <Route path="/Dashboard/professor" element={<Dashboardprof />} />

          {/* Define route for the login page */}
          <Route path="/" element={ <LoginPage />} />
        </Routes>
       
       
      </div>
    </BrowserRouter>
    </>
  )
}

export default App;
