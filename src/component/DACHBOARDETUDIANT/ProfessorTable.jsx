import React from 'react';



// Fonction pour le bouton "effacer" pour les professeurs
export const deleteProfessor = () => {
    // Logique pour effacer un professeur
    console.log(" professeur effacé ");
};

// Fonction pour le bouton "modifier" pour les professeurs
export const editProfessor = () => {
    // Logique pour modifier un professeur
    console.log(" professeur modifié");
};

// Fonction pour la table des professeurs
function ProfessorTable() {
    const professorData = [
        { id: 1, name: "Professor X", session1: { room: "A101", status: "Présent" }, session2: { room: "B205", status: "Absent" }, session3: { room: "C307", status: "Présent" }, session4: { room: "D409", status: "Absent" } , date: "2024-04-21"  } ,
        { id: 2, name: "Professor Y", session1: { room: "E101", status: "Absent" }, session2: { room: "F205", status: "Présent" }, session3: { room: "G307", status: "Absent" }, session4: { room: "H409", status: "Présent" }  , date: "2024-04-21" },
        // Ajouter d'autres professeurs si nécessaire
    ];

    return (
        <div className="table-container">
             {/* Afficher la date du jours */}
            <p>Date: {professorData.length > 0 && professorData[0].date}</p>
            <table className="professor-table">
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
                    {professorData.map(professor => (
                        <tr key={professor.id}>
                            <td>{professor.id}</td>
                            <td>{professor.name}</td>
                            <td>{professor.session1.room} - {professor.session1.status}</td>
                            <td>{professor.session2.room} - {professor.session2.status}</td>
                            <td>{professor.session3.room} - {professor.session3.status}</td>
                            <td>{professor.session4.room} - {professor.session4.status}</td>
                            <td> <button className="hover:underline" onClick={deleteProfessor}>
                                Effacer
                            </button>
                                <button className="hover:underline" onClick={editProfessor}>
                                    Modifier 
                                </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProfessorTable;
