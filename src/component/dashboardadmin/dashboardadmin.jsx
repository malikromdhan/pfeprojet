import React, { useState } from 'react';
import './dashboardadmin.css';
import StudentTable from './StudentTable';
import ProfessorTable from './ProfessorTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';





function Dashboardadmin() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);





  const [displayStudents, setDisplayStudents] = useState(false);
  const [displayProfessors, setDisplayProfessors] = useState(false);
  const [displayProfessorsbouton, setDisplayProfessorsbouton] = useState(false);
  const [displayStudentsbouton, setDisplayStudentsbouton] = useState(false);

  const handleDisplayStudents = () => {
    setDisplayStudents(true);
    setDisplayProfessors(false);
    setDisplayProfessorsbouton(false);
    setDisplayStudentsbouton(true);
  };

  const handleDisplayProfessors = () => {
    setDisplayStudents(false);
    setDisplayProfessors(true);
    setDisplayProfessorsbouton(true);
    setDisplayStudentsbouton(false);
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
                Prof
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
                        <Modal.Title>ajouter un etudiant</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" >
                            <Form.Label>nom</Form.Label>
                            <Form.Control type="text" placeholder="Enter le nom d'etudiant" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                          </Form.Group>
                          <Form.Group className="mb-3" >
                            <Form.Label>dans quel classe </Form.Label>
                            <Form.Control type="text" placeholder="Enter la classe d'etudiant" />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
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
                        <Modal.Title>ajouter un prof</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" >
                            <Form.Label>nom</Form.Label>
                            <Form.Control type="text" placeholder="Enter le nom du prof" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
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
          {displayStudents && <StudentTable />}
          {displayProfessors && <ProfessorTable />}
        </div>
      </div>

    </>
  );
}

export default Dashboardadmin;
