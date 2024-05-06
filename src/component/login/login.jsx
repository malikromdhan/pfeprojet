import axios from 'axios';
import React, { useState } from 'react';
import './login.css';


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
 
  const handleUserLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        Id: userCn,
        password: userPassword
      });
      console.log('Réponse du serveur:', response.data);
      const { user, token } = response.data; // Récupération des informations de l'utilisateur et du token
      const userRole = user.role;
     
      // Construire l'URL de redirection en utilisant le rôle de l'administrateur
      const redirectURL = `/dashboard/${userRole}`;
      // Rediriger l'utilisateur vers le tableau de bord approprié
      window.location.href = redirectURL;
      console.log('Informations de l\'utilisateur:', user);
      console.log('Jeton d\'authentification:', token);
    

      // ...
    } catch (error) {
      console.error('Erreur lors de la connexion en tant qu\'utilisateur:', error.message);
      // ...
    }
  };
  const handleAdminLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/admin/login', {
        Id: adminCn,
        password: adminPassword
      });
      console.log('Réponse du serveur:', response.data);
      const { admin, token } = response.data;
      const adminRole = admin.role;
  
      // Construire l'URL de redirection en utilisant le rôle de l'administrateur
      const redirectURL = `/dashboard/${adminRole}`;
  
      // Rediriger l'utilisateur vers le tableau de bord approprié
      window.location.href = redirectURL;
  
    } catch (error) {
      console.error('Erreur lors de la connexion en tant qu\'utilisateur:', error.message);
      // Gérer les erreurs pour l'administrateur
    }
  };
  
  
  const handleLogin = () => {
    if (userMode) {
      handleUserLogin();
    } else if (adminMode) {
      handleAdminLogin();
    }
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
      </div>
    </>
  );
};

export default LoginPage;
