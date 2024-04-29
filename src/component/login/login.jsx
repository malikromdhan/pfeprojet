import Dachboardetudiant from '../dashboardadmin/dashboardadmin';
import './login.css'
import React, { useState } from 'react';

const LoginPage = () => {
  const [userMode, setUserMode] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [userCn, setUserCn] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminCn, setAdminCn] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleUserMode = () => {
    setUserMode(true);
    setAdminMode(false);
  };

  const handleAdminMode = () => {
    setUserMode(false);
    setAdminMode(true);
  };

  const handleUserCnChange = (e) => {
    setUserCn(e.target.value);
  };

  const handleUserPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleAdminCnChange = (e) => {
    setAdminCn(e.target.value);
  };

  const handleAdminPasswordChange = (e) => {
    setAdminPassword(e.target.value);
  };

  const handleLogin = () => {
   // if (userMode) {
      // Logique de connexion pour l'utilisateur
     // console.log('Login en tant qu\'utilisateur avec CN:', userCn, 'et mot de passe:', userPassword);
    //} else if (adminMode) {
      // Logique de connexion pour l'administrateur
      //console.log('Login en tant qu\'administrateur avec CN:', adminCn, 'et mot de passe:', adminPassword);
    //}
    
  
  };

  return (
    <>

     <div className='body'>
     <div className="login-page">
        <div className="login-container">
          <div className="login-form">
            <h2 className="login-title">Login</h2>
            {userMode && (
              <div className="user-mode">
                <h3>Mode Utilisateur</h3>
                <input
                  type="text"
                  placeholder="CN"
                  value={userCn}
                  onChange={handleUserCnChange}
                  className="user-cn-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={userPassword}
                  onChange={handleUserPasswordChange}
                  className="user-password-input"
                />
                <button onClick={handleLogin} className="login-button">Login</button>
              </div>
            )}
            {adminMode && (
              <div className="admin-mode">
                <h3>Mode Administrateur</h3>
                <input
                  type="text"
                  placeholder="Admin CN"
                  value={adminCn}
                  onChange={handleAdminCnChange}
                  className="admin-cn-input"
                />
                <input
                  type="password"
                  placeholder="Admin Password"
                  value={adminPassword}
                  onChange={handleAdminPasswordChange}
                  className="admin-password-input"
                />
                <button onClick={handleLogin} className="login-button">Login</button>
              </div>
            )}
            {!userMode && !adminMode && (
              <div className="mode-select">
                <button onClick={handleUserMode} className="user-mode-button">User Mode</button>
                <button onClick={handleAdminMode} className="admin-mode-button">Admin Mode</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
       
      

      </div>

     </div>


    </>
  );
}
export default (LoginPage)
