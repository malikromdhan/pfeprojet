import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';




// Fonction pour le bouton "effacer" pour les étudiants
export const deleteStudent = () => {
  // Logique pour effacer un étudiant
  console.log("Etudiant effacé");
};




// Fonction pour la table des étudiants
function StudentTable() {
  const studentsData = [
    { id: 1, name: "malek romdhane", session1: { room: "salle 3", status: "Présent" }, session2: { room: "salle 5", status: "Absent" }, session3: { room: "salle 5", status: "Présent" }, session4: { room: "salle 10", status: "Absent" }, date: "2024-04-21", class: "A" },
    { id: 2, name: "yosri chafcher", session1: { room: "salle 4", status: "Absent" }, session2: { room: "salle 3", status: "Présent" }, session3: { room: "salle 7", status: "Absent" }, session4: { room: "salle 9", status: "Présent" }, date: "2024-04-21", class: "B" },
    { id: 3, name: "mohammed x", session1: { room: "salle 1", status: "Présent" }, session2: { room: "salle 2", status: "Absent" }, session3: { room: "salle 6", status: "Présent" }, session4: { room: "salle 5", status: "Absent" }, date: "2024-04-21", class: "C" },
    { id: 4, name: "ali", session1: { room: "salle 1", status: "Absent" }, session2: { room: "salle 2", status: "Présent" }, session3: { room: "salle 6", status: "Absent" }, session4: { room: "salle 5", status: "Présent" }, date: "2024-04-21", class: "C" },
    // Ajouter d'autres étudiants si nécessaire
  ];
  const [edit, setEdit] = useState(false);

  const handlecloseEdit = () => setEdit(false);
  const handleShowEdit = () => setEdit(true);


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClassFilter = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleDateFilter = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredStudents = studentsData.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClass === 'All' || student.class === selectedClass) &&
      (selectedDate === '' || student.date === selectedDate)
    );
  });

  return (
    <div className="table-container">
      <div className='recherche'>
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedClass} onChange={handleClassFilter}>
          <option value="All">Toutes les classes</option>
          <option value="A">Classe A</option>
          <option value="B">Classe B</option>
          <option value={"C"}> classe C</option>
          <option value={"D"}> classe D</option>
          {/* Ajouter d'autres options de classe si nécessaire */}
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
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.session1.room} - {student.session1.status}</td>
              <td>{student.session2.room} - {student.session2.status}</td>
              <td>{student.session3.room} - {student.session3.status}</td>
              <td>{student.session4.room} - {student.session4.status}</td>
              <td>
                <button className="bout" onClick={() => deleteStudent(student.id)}>
                  Effacer
                </button>
                <button className="bout1" onClick={() => handleShowEdit(student.id)}>
                  Modifier
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      {/*pour modifier cord d'etudiant */}
      {edit && (
        <div className='formul'>
          <Modal show={edit} onHide={handlecloseEdit} className="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>modifier cordonner d'etudiant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label> nouveau nom</Form.Label>
                  <Form.Control type="text" placeholder="Enter le nom d'etudiant" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label> nouvelle Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>nouvelle  classe </Form.Label>
                  <Form.Control type="text" placeholder="Enter la classe d'etudiant" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlecloseEdit}>
                Close
              </Button>
              <Button variant="primary" onClick={handlecloseEdit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>)}



    </div>
  );
}

export default StudentTable;