
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import axios from 'axios';




// Fonction pour le bouton "effacer" pour les professeurs
export const deleteProfessor = () => {
    // Logique pour effacer un professeur
    console.log(" professeur effacé ");
};



// Fonction pour la table des professeurs
function ProfessorTable() {




    const [professorsData, setProfessorData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [selectedProfessorId, setSelectedProfessorId] = useState(null);
    const handlecloseEdit = () => setEdit(false);

    // Fonction pour gérer l'édition d'un étudiant
    const handleEditprofessor = (professorId) => {
        setSelectedProfessorId(professorId);
        setEdit(true);
    };



    const [searchTerm, setSearchTerm] = useState('');

    const [selectedDate, setSelectedDate] = useState('');

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [professorIdToDelete, setProfessorIdToDelete] = useState(null);

    // Fonction pour afficher la boîte de dialogue de confirmation
    const handleShowConfirmationModal = (professorId) => {
        setProfessorIdToDelete(professorId); // Définir l'ID de l'étudiant à supprimer
        setShowConfirmationModal(true);
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    };




    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const uniqueClasses = Array.isArray(professorsData) ? [...new Set(professorsData.map(student => student.classe))] : [];


    const handleDateFilter = (event) => {
        setSelectedDate(event.target.value);
    };

    const filteredProfessors = professorsData.filter((professor) => {
        return (
            professor.role === 'professor' &&
            professor.username.toLowerCase().includes(searchTerm.toLowerCase()) &&

            (selectedDate === '' || professor.date === selectedDate)

        );
    });






    // Fonction pour supprimer l'étudiant
    const handleDeleteStudent = async () => {
        try {
            console.log(professorIdToDelete)

            // Envoyez une requête pour supprimer l'étudiant de la base de données
            await axios.delete('http://localhost:3001/api//users/:Id', { data: { Id: professorIdToDelete } });

            // Mettez à jour l'affichage en supprimant l'entrée correspondante de la liste des étudiants affichés
            setProfessorData(prevData => prevData.filter(student => student.Id !== professorIdToDelete));

            // Fermez la boîte de dialogue de confirmation
            handleCloseConfirmationModal();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'étudiant :', error);
        }
    };
    // fonction pour modifier donner du proff
    // Fonction pour mettre à jour les détails de l'étudiant
    const handleUpdateProfessor = async () => {
        try {
            // Récupérer les détails de l'étudiant à partir de studentsData en fonction de selectedStudentId
            const updatedProfessor = professorsData.find(professor => professor.Id === selectedProfessorId);

            // Envoyer les détails de l'étudiant mis à jour au serveur
            await axios.put(`http://localhost:3001/api/users/${selectedProfessorId}`, updatedProfessor);

            // Rafraîchir les données des étudiants après la mise à jour
            const response = await axios.get('http://localhost:3001/api/users');
            setProfessorData(response.data);

            // Fermer le formulaire de modification
            setEdit(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'étudiant :', error);
        }
    };










    useEffect(() => {
        // Fonction pour charger les données des étudiants depuis une API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users');
                setProfessorData(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            }
        };

        // Appel de la fonction de chargement des données lors du montage du composant
        fetchData();
    }, []); // Le tableau vide [] comme deuxième argument assure que l'effet s'exécute une seule fois lors du montage





    return (
        <div className="table-container">
            <div className='recherche'>
                <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
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
                        <tr key={professor.Id}>
                            <td>{professor.Id}</td>
                            <td>{professor.username}</td>
                            <td>{professor.status.session1 ? `${professor.status.session1.room1} - ${professor.status.session1.etats1}` : ''}</td>
                            <td>{professor.status.session2 ? `${professor.status.session2.room2} - ${professor.status.session2.etats2}` : ''}</td>
                            <td>{professor.status.session3 ? `${professor.status.session3.room3} - ${professor.status.session3.etats3}` : ''}</td>
                            <td>{professor.status.session4 ? `${professor.status.session4.room4} - ${professor.status.session4.etats4}` : ''}</td>
                            <td> <button className="hover:underline" onClick={() => handleShowConfirmationModal(professor.Id)}>
                                Effacer
                            </button>
                                <button className="hover:underline" onClick={() => handleEditprofessor(professor.Id)}>
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
                                    <Form.Control type="text" placeholder="Enter le nom du prof" name='username' value={professorsData[selectedProfessorId]} onChange={(e) => setProfessorData(prevData => prevData.map(professor => { if (professor.Id === selectedProfessorId) { return { ...professor, username: e.target.value }; } return professor; }))} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label> nouvelle Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='password' value={professorsData[selectedProfessorId]} onChange={(e) => setProfessorData(prevData => prevData.map(professor => { if (professor.Id === selectedProfessorId) { return { ...professor, password: e.target.value }; } return professor; }))} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handlecloseEdit}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => handleUpdateProfessor(selectedProfessorId)}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
            <div className='formul'>
                <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal} className="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation de la suppression</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Êtes-vous sûr de vouloir supprimer cet professeur ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseConfirmationModal}>
                            Annuler
                        </Button>
                        <Button variant="primary" onClick={() => handleDeleteStudent(professorIdToDelete)}>
                            Confirmer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>



        </div>
    );
}

export default ProfessorTable;
