import React, { useState } from 'react';
import './dashboardadmin.css';
import StudentTable from './StudentTable';
import ProfessorTable from './ProfessorTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importez Axios ou une autre bibliothèque HTTP



function Dashboardadmin() {

  const [show, setShow] = useState(false);
  const [role, setRole] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () =>{
    setShow(true);
    setRole(role); // Mettre à jour le rôle selon le bouton cliqué
  } 
  const [userData, setUserData] = useState({
    Id: '',
    username: '',
    email: '',
    uId: '',
    role: '',
    password: '', // Assurez-vous que vous avez un champ pour le mot de passe
    classe: '',
  });





  const [displayStudents, setDisplayStudents] = useState(false);
  const [displayProfessors, setDisplayProfessors] = useState(false);
  const [displayProfessorsbouton, setDisplayProfessorsbouton] = useState(false);
  const [displayStudentsbouton, setDisplayStudentsbouton] = useState(false);

  const handleDisplayStudents = () => {
    setDisplayStudents(true);
    setDisplayProfessors(false);
    setDisplayProfessorsbouton(false);
    setDisplayStudentsbouton(true);
    setRole('student');

  };

  const handleDisplayProfessors = () => {
    setDisplayStudents(false);
    setDisplayProfessors(true);
    setDisplayProfessorsbouton(true);
    setDisplayStudentsbouton(false);
    setRole('professor');
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddUser = async () => {
    try {
      // Mettre à jour le rôle selon le bouton cliqué
      const userRole = role === 'student' ? 'student' : 'professor';
  
      // Ajouter le rôle aux données utilisateur
      const userDataWithRole = { ...userData, role: userRole };
  
      // Envoyer les données utilisateur à votre backend
      const response = await axios.post('http://localhost:3001/api/users', userDataWithRole);
      
      console.log('Nouvel utilisateur ajouté:', response.data);
      handleClose(); // Fermer le modal après l'ajout de l'utilisateur
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
  };
  







  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };



  return (
    <>
      <div className="dachboardetudiant-container">
        {/* Contenu de votre tableau de bord */}
        <header className="head">
          <div className="log">
            <h2 className="log in">
              University Admin
            </h2>
            <nav className="lein">
              <button className="hover:underline" onClick={handleDisplayStudents}>
                Students
              </button>
              <button className="hover:underline" onClick={handleDisplayProfessors}>
                Proffessor
              </button>
            </nav>
            <div className='bouton'>
              {/* Afficher les boutons selon l'état */}
              {displayStudentsbouton && (
                <div>
                  <button className="hover:underline" onClick={handleShow}>
                    Ajouter un etudiant
                  </button>
                  {/*formulaire pour ajouter un etudiant */}
                  <div className='formul'>
                    <Modal show={show} onHide={handleClose} className="custom-modal">
                      <Modal.Header closeButton>
                        <Modal.Title>Ajouter un étudiant</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="text" name="Id" value={userData.Id} onChange={handleInputChange} placeholder="Enter student's ID" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Mot de passe" name='password' value={userData.password} onChange={handleInputChange} />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>username</Form.Label>
                            <Form.Control type="text" placeholder="Entrer le nom de l'étudiant" name='username' value={userData.username} onChange={handleInputChange} />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Entrer l'email de l'étudiant" name='email'value={userData.email} onChange={handleInputChange} />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Uid</Form.Label>
                            <Form.Control type="text" placeholder="Entrer l'Uid de l'étudiant" name='uId' value={userData.uId} onChange={handleInputChange}/>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" placeholder="Entrer le rôle de l'étudiant" name='role'  value={role} readOnly onChange={handleInputChange} />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Classe</Form.Label>
                            <Form.Control type="text" placeholder="Entrer la classe de l'étudiant"  name='classe' value={userData.classe} onChange={handleInputChange}/>
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Fermer
                        </Button>
                        <Button variant="primary" onClick={handleAddUser}>
                          Enregistrer les modifications
                        </Button>
                      </Modal.Footer>
                    </Modal>

                  </div>

                </div>


              )}
              {displayProfessorsbouton && (
                <div>
                  <button className="hover:underline" onClick={handleShow}>
                    Ajouter un prof
                  </button>
                  {/*formulaire pour ajouter un prof */}
                  <div className='formul'>
                    <Modal show={show} onHide={handleClose} className="custom-modal">
                      <Modal.Header closeButton>
                        <Modal.Title>Ajouter un prof</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="text" placeholder="Enter l'ID du professeur" name='Id'value={userData.Id}onChange={handleInputChange}/>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="Mot de passe"name='password'value={userData.password}onChange={handleInputChange} />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" placeholder="Enter le nom du prof"name='username'value={userData.username}onChange={handleInputChange} />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter l'email du prof"name='email'value={userData.email}onChange={handleInputChange} />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Uid</Form.Label>
                            <Form.Control type="text" placeholder="Enter l'UID du prof"name='uId'value={userData.uId}onChange={handleInputChange} />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" placeholder="Enter le rôle du prof" name='role' value={role} readOnly onChange={handleInputChange} />
                          </Form.Group>                          
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Fermer
                        </Button>
                        <Button variant="primary" onClick={handleAddUser}>
                          Enregistrer les modifications
                        </Button>
                      </Modal.Footer>
                    </Modal>

                  </div>

                </div>
              )}
            </div>
          </div>
        </header>
        <div className="table-container">
        {displayStudents && <StudentTable role="student" />}

          {displayProfessors && <ProfessorTable role="professor"/>}
        </div>
        <div className="footer">
          {/* Bouton de déconnexion */}
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>

    </>
  );
}

export default Dashboardadmin;
