import React from 'react';


    
  // Fonction pour le bouton "effacer" pour les étudiants
  export const deleteStudent = () => {
    // Logique pour effacer un étudiant
    console.log("Etudiant effacé");
  };
    
  // Fonction pour le bouton "modifier" pour les étudiants
  export const editStudent = () => {
    // Logique pour modifier un étudiant
    console.log("Etudiant modifié");
  };

// Fonction pour la table des étudiants

// Fonction pour la table des étudiants
function StudentTable() {
  const studentsData = [
    { id: 1, name: "malek romdhane", session1: { room: "A101", status: "Présent" }, session2: { room: "B205", status: "Absent" }, session3: { room: "C307", status: "Présent" }, session4: { room: "D409", status: "Absent" }, date: "2024-04-21" },
    { id: 2, name: "yosri chafcher", session1: { room: "A101", status: "Absent" }, session2: { room: "B205", status: "Présent" }, session3: { room: "C307", status: "Absent" }, session4: { room: "D409", status: "Présent" }, date: "2024-04-21" },
    // Ajouter d'autres étudiants si nécessaire
  ];

  return (
    <div className="table-container">
      {/* Afficher la date du jours */}
      <p>Date: {studentsData.length > 0 && studentsData[0].date}</p>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Séance 1</th>
            <th>Séance 2</th>
            <th>Séance 3</th>
            <th>Séance 4</th>
            <th>delate/patch</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.session1.room} - {student.session1.status}</td>
              <td>{student.session2.room} - {student.session2.status}</td>
              <td>{student.session3.room} - {student.session3.status}</td>
              <td>{student.session4.room} - {student.session4.status}</td>
              <td> <button className="bout" onClick={deleteStudent}>
                  Effacer
                </button>
                <button className="bout1" onClick={editStudent}>
                  Modifier
                </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
