import React, { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; // Importez Axios ou une autre bibliothèque HTTP




// Fonction pour le bouton "effacer" pour les étudiants
export const deleteStudent = () => {
  // Logique pour effacer un étudiant
  console.log("Etudiant effacé");
};




// Fonction pour la table des étudiants
function StudentTable() {
  const [studentsData, setStudentsData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handlecloseEdit = () => setEdit(false);
 

  


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClasse, setSelectedClasse] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
   
  // Fonction pour gérer l'édition d'un étudiant
  const handleEditStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setEdit(true);
  };

  // Fonction pour afficher la boîte de dialogue de confirmation
  const handleShowConfirmationModal = (studentId) => {
    setStudentIdToDelete(studentId); // Définir l'ID de l'étudiant à supprimer
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };




  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

 const uniqueClasses = Array.isArray(studentsData) ? [...new Set(studentsData.map(student => student.classe))] : [];




  const handleClassFilter = (event) => {
    setSelectedClasse(event.target.value);
  };

  const handleDateFilter = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredStudents = studentsData.filter((student) => {
    // Convertir la date sélectionnée par l'utilisateur en objet Date JavaScript
    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;

    // Vérifier si la date sélectionnée correspond à la date de l'étudiant
    return (
      student.role === 'student' &&
      student.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClasse === 'All' || student.classe === selectedClasse) &&
      (!selectedDate || student.date === selectedDateObj.toISOString())
    );
  });


  // Fonction pour supprimer l'étudiant
  const malik = () =>{
    console.log("ID de l'étudiant sélectionné :", studentId);
  }
  
  // Fonction pour supprimer l'étudiant
  const handleDeleteStudent = async () => {
    try {
      console.log(studentIdToDelete) 
  
      // Envoyez une requête pour supprimer l'étudiant de la base de données
      await axios.delete('http://localhost:3001/api//users/:Id', { data: { Id: studentIdToDelete } });
  
      // Mettez à jour l'affichage en supprimant l'entrée correspondante de la liste des étudiants affichés
      setStudentsData(prevData => prevData.filter(student => student.Id !== studentIdToDelete));
  
      // Fermez la boîte de dialogue de confirmation
      handleCloseConfirmationModal();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'étudiant :', error);
    }
  };
  


  useEffect(() => {
    // Fonction pour charger les données des étudiants depuis une API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        const dataValues = Object.values(response.data);
        setStudentsData(dataValues);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    // Appel de la fonction de chargement des données lors du montage du composant
    fetchData();
  }, []); // Le tableau vide [] comme deuxième argument assure que l'effet s'exécute une seule fois lors du montage


//fonction pour modifier un etudiant
// Fonction pour mettre à jour les détails de l'étudiant
const handleUpdateStudent = async () => {
  try {
    // Récupérer les détails de l'étudiant à partir de studentsData en fonction de selectedStudentId
    const updatedStudent = studentsData.find(student => student.Id === selectedStudentId);

    // Envoyer les détails de l'étudiant mis à jour au serveur
    await axios.put(`http://localhost:3001/api/users/${selectedStudentId}`, updatedStudent);
    
    // Rafraîchir les données des étudiants après la mise à jour
    const response = await axios.get('http://localhost:3001/api/users');
    setStudentsData(response.data);
    
    // Fermer le formulaire de modification
    setEdit(false);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'étudiant :', error);
  }
};

  // Reste du code...
 












  return (
    <div className="table-container">
      <div className='recherche'>
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedClasse} onChange={handleClassFilter}>
          <option value="All">Toutes les classes</option>
          {/* Générer les options pour chaque classe unique */}
          {uniqueClasses.map((classValue, index) => (
            <option key={index} value={classValue}>{classValue}</option>
          ))}


        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateFilter}
        />
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Séance 1</th>
            <th>Séance 2</th>
            <th>Séance 3</th>
            <th>Séance 4</th>
            <th>Actions</th>
          </tr>
        </thead>
        {studentsData.length > 0 && (
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student.Id}>
              <td>{student.Id}</td>
              <td>{student.username}</td>
              <td>{student.status.session1 ? `${student.status.session1.room1} - ${student.status.session1.etats1}` : ''}</td>
              <td>{student.status.session2 ? `${student.status.session2.room2} - ${student.status.session2.etats2}` : ''}</td>
              <td>{student.status.session3 ? `${student.status.session3.room3} - ${student.status.session3.etats3}` : ''}</td>
              <td>{student.status.session4 ? `${student.status.session4.room4} - ${student.status.session4.etats4}` : ''}</td>
              <td>
                <button className="bout" onClick={() => handleShowConfirmationModal(student.Id)}>
                  Effacer
                </button>
                <button className="bout1" onClick={() => handleEditStudent(student.Id)}>
                  Modifier
                </button>
              </td>
            </tr>
          ))}

        </tbody>
        )}
      </table>
      {/*pour modifier cord d'etudiant */}
      {edit && (
        <div className='formul'>
          <Modal show={edit} onHide={handlecloseEdit} className="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>Modifier les coordonnées de l'étudiant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nouvel ID</Form.Label>
                  <Form.Control type="text" placeholder="Entrez le nouvel ID de l'étudiant" name='Id'  value={studentsData[selectedStudentId]}  onChange={(e) => setStudentsData(prevData => prevData.map(student => { if (student.Id === selectedStudentId) { return { ...student, Id: e.target.value };  } return student; }))}  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nouvel password</Form.Label>
                  <Form.Control type="text" placeholder="Entrez la nouvelle password de l'étudiant" name='password'  value={studentsData[selectedStudentId]}  onChange={(e) => setStudentsData(prevData => prevData.map(student => { if (student.Id === selectedStudentId) { return { ...student, password: e.target.value };  } return student; }))}  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nouvel username</Form.Label>
                  <Form.Control type="text" placeholder="Entrez le nouveau nom de l'étudiant"name='username'  value={studentsData[selectedStudentId]}  onChange={(e) => setStudentsData(prevData => prevData.map(student => { if (student.Id === selectedStudentId) { return { ...student, username: e.target.value };  } return student; }))}  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nouvel classe</Form.Label>
                  <Form.Control type="text" placeholder="Entrez le nouvel classe de l'étudiant"name='classe'  value={studentsData[selectedStudentId]}  onChange={(e) => setStudentsData(prevData => prevData.map(student => { if (student.Id === selectedStudentId) { return { ...student, classe: e.target.value };  } return student; }))}  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label> nouvelle uId</Form.Label>
                  <Form.Control type="text" placeholder="Entrez le nouvel uId de l'étudiant"name='uId' value={studentsData[selectedStudentId]}  onChange={(e) => setStudentsData(prevData => prevData.map(student => { if (student.Id === selectedStudentId) { return { ...student, uId: e.target.value };  } return student; }))}  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label> nouvelle email</Form.Label>
                  <Form.Control type="text" placeholder="Entrez le nouvel email de l'étudiant" name='email'value={studentsData.email} onChange={(e) => setStudentsData(prevData => prevData.map(student => { if (student.Id === selectedStudentId) { return { ...student, email: e.target.value };  } return student; }))}  />
                </Form.Group>
                {/* Ajoutez des champs similaires pour les autres variables */}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlecloseEdit}>
                Fermer
              </Button>
              <Button variant="primary" onClick={() => handleUpdateStudent(selectedStudentId)}>
                Enregistrer les modifications
              </Button>
            </Modal.Footer>
          </Modal>

        </div>)}


      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal} className="confirmation-modal">
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cet étudiant ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={() => handleDeleteStudent(studentIdToDelete)}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  );
}

export default StudentTable;