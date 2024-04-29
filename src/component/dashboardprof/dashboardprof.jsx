import './dashboardprof.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';







const Dashboardprof = () => {
    const studentsData = [
        { id: 1, name: "malek romdhane", session1: { room: "salle 3", status: "Présent" }, session2: { room: "salle 5", status: "Absent" }, session3: { room: "salle 5", status: "Présent" }, session4: { room: "salle 10", status: "Absent" }, date: "2024-04-21", class: "A" },
        { id: 2, name: "yosri chafcher", session1: { room: "salle 4", status: "Absent" }, session2: { room: "salle 3", status: "Présent" }, session3: { room: "salle 7", status: "Absent" }, session4: { room: "salle 9", status: "Présent" }, date: "2024-04-21", class: "B" },
        { id: 3, name: "mohammed x", session1: { room: "salle 1", status: "Présent" }, session2: { room: "salle 2", status: "Absent" }, session3: { room: "salle 6", status: "Présent" }, session4: { room: "salle 5", status: "Absent" }, date: "2024-04-21", class: "C" },
        { id: 4, name: "ali", session1: { room: "salle 1", status: "Absent" }, session2: { room: "salle 2", status: "Présent" }, session3: { room: "salle 6", status: "Absent" }, session4: { room: "salle 5", status: "Présent" }, date: "2024-04-21", class: "C" },
        // Ajouter d'autres étudiants si nécessaire
    ];



    const [selectedSession, setSelectedSession] = useState(''); // State pour stocker la séance sélectionnée
    const [presenceStatus, setPresenceStatus] = useState(''); // State pour stocker le statut de présence sélectionné

    // Fonction pour gérer le changement de sélection de la séance
    const handleSessionChange = (event) => {
        setSelectedSession(event.target.value);
    };

    // Fonction pour gérer le changement de sélection du statut de présence
    const handlePresenceStatusChange = (event) => {
        setPresenceStatus(event.target.value);
    };

    // Fonction pour gérer la soumission du formulaire de modification de statut de présence
    const handleSubmit = () => {
        // Ici, tu peux implémenter la logique pour mettre à jour le statut de présence de l'étudiant
        // en utilisant les valeurs de selectedSession et presenceStatus
        // Par exemple, tu peux envoyer une requête au backend pour effectuer la mise à jour
        // Assure-toi de gérer correctement la validation et la confirmation des données avant de les soumettre
        console.log ("status changer") ;
    };





    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleclose = () => setShow(false);





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
        <div className='dashboardprof-container'>
            <header className='headr'>
                <nav>
                    <h2>
                        professor Dashboard 
                    </h2>
                    <div className='recherche1'>
                        <input
                            type='text'
                            placeholder="rechercher par nom..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <select value={selectedClass} onChange={handleClassFilter} >
                            <option value={"All"}> Toutes les classes </option>
                            <option value={"A"}> classe A</option>
                            <option value={"B"}> classe B</option>
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
                </nav>
            </header>

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
                                <button className="bout2" onClick={handleShow}>
                                    Modifier
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {/*pour modifier cordonner du prof */}
            {show && (
                <div className='formul1'>
                    <Modal show={show} onHide={handleclose} className="custom-modal">
                        <Modal.Header closeButton>
                            <Modal.Title> quelle Séance</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Séance</Form.Label>
                                    <Form.Select onChange={handleSessionChange} value={selectedSession}>
                                        <option value="">Sélectionner une séance</option>
                                        {/* Ajouter des options pour chaque séance */}
                                        <option value="session1">Séance 1</option>
                                        <option value="session2">Séance 2</option>
                                        <option value="session3">Séance 3</option>
                                        <option value="session4">Séance 4</option>
                                    </Form.Select>
                                </Form.Group>

                                {/* Ajouter des boutons radio pour sélectionner le nouveau statut de présence */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Nouveau statut de présence</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Présent"
                                            name="presenceStatus"
                                            value="Présent"
                                            onChange={handlePresenceStatusChange}
                                            checked={presenceStatus === 'Présent'}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Absent"
                                            name="presenceStatus"
                                            value="Absent"
                                            onChange={handlePresenceStatusChange}
                                            checked={presenceStatus === 'Absent'}
                                        />
                                    </div>
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleclose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={ handleSubmit }>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}


        </div>
    )
}
export default Dashboardprof