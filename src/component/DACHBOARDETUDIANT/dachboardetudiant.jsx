import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './dachboardetudiant.css';
import StudentTable from './StudentTable';
import ProfessorTable from './ProfessorTable';




// Fonction pour le bouton "ajouter" pour les professeurs
 const addProfessor = () => {
  // Logique pour ajouter un professeur
  console.log("Ajouter un professeur");
};
// Fonction pour le bouton "ajouter" pour les étudiants
 const addStudent = () => {
  // Logique pour ajouter un étudiant
  console.log("Ajouter un etudiant");
};




function Dachboardetudiant() {
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
                <button className="hover:underline" onClick={addStudent}>
                  Ajouter un etudiant
                </button>
               
              </div>
            )}
            {displayProfessorsbouton && (
              <div>
                <button className="hover:underline" onClick={addProfessor}>
                  Ajouter un prof
                </button>
               
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
  );
}

export default Dachboardetudiant;
