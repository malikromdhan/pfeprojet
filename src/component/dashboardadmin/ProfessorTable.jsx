import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';




// Fonction pour le bouton "effacer" pour les professeurs
export const deleteProfessor = () => {
    // Logique pour effacer un professeur
    console.log(" professeur effacé ");
};



// Fonction pour la table des professeurs
function ProfessorTable() {
    const professorData = [
        { id: 1, name: "Professor X", session1: { room: "A101", status: "Présent" }, session2: { room: "B205", status: "Absent" }, session3: { room: "C307", status: "Présent" }, session4: { room: "D409", status: "Absent" }, date: "2024-04-21", class: "A" },
        { id: 2, name: "Professor Y", session1: { room: "E101", status: "Absent" }, session2: { room: "F205", status: "Présent" }, session3: { room: "G307", status: "Absent" }, session4: { room: "H409", status: "Présent" }, date: "2024-04-21", class: "B" },
        // Ajouter d'autres professeurs si nécessaire
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

    const filteredProfessors = professorData.filter((professor) => {
        return (
            professor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedClass === 'All' || professor.class === selectedClass) &&
            (selectedDate === '' || professor.date === selectedDate)

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
                    {/* Ajouter d'autres options de classe si nécessaire */}
                </select>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateFilter}
                />
            </div>
            <table className="professor-table">
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
                    {filteredProfessors.map(professor => (
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
                                <button className="hover:underline" onClick={handleShowEdit}>
                                    Modifier
                                </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/*pour modifier cordonner du prof */}
            {edit && (
                <div className='formul'>
                    <Modal show={edit} onHide={handlecloseEdit} className="custom-modal">
                        <Modal.Header closeButton>
                            <Modal.Title>modifier cordonner du prof</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" >
                                    <Form.Label> nouveau nom</Form.Label>
                                    <Form.Control type="text" placeholder="Enter le nom du prof" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label> nouvelle Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
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
                </div>
            )}

        </div>
    );
}

export default ProfessorTable;
