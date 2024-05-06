import './dashboardprof.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importez Axios ou une autre bibliothèque HTTP








const Dashboardprof = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);




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



    // Fonction pour gérer le clic sur le bouton "Modifier"
    const handleModifyClick = (studentId) => {
        setSelectedStudentId(studentId);
        setShow(true, studentId);

    };






    const [show, setShow] = useState(false);
    const handleclose = () => setShow(false);

    const handleShow = (studentId) => {
        setSelectedStudentId(studentId); // Stockez l'ID de l'étudiant dans l'état
        setShow(true);
    };





    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClasse, setSelectedClasse] = useState('All');
    const [selectedDate, setSelectedDate] = useState('');

    const uniqueClasses = [...new Set(studentsData.map(student => student.classe))];

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClassFilter = (event) => {
        setSelectedClasse(event.target.value);
    };

    const handleDateFilter = (event) => {
        setSelectedDate(event.target.value);
    };


    // Filtrer les données des étudiants en fonction de la date sélectionnée
    const filteredStudents = studentsData.filter((student) => {
        // Convertir la date sélectionnée par l'utilisateur en objet Date JavaScript
        const selectedDateObj = selectedDate ? new Date(selectedDate) : null;

        // Vérifier si la date sélectionnée correspond à la date de l'étudiant
        return (
            student.role === 'student' &&
            student.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedClasse === 'All' || student.classe === selectedClasse) &&
            (!selectedDate || student.date === selectedDateObj.toISOString().slice(0, 10)) // Filtrer par la date seulement (sans l'heure)
        );
    });


    // fonction logout 
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };




    useEffect(() => {
        // Fonction pour charger les données des étudiants depuis une API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users');
                setStudentsData(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            }
        };

        // Appel de la fonction de chargement des données lors du montage du composant
        fetchData();
    }, []); // Le tableau vide [] comme deuxième argument assure que l'effet s'exécute une seule fois lors du montage



    // Mettez à jour la fonction handleSubmit pour ne prendre en compte que selectedSession et presenceStatus
    // Mettez à jour la fonction handleSubmit pour ne prendre en compte que selectedSession et presenceStatus
    const handleSubmit = async () => {
        try {
            // Vérifiez si une séance est sélectionnée
            if (!selectedSession) {
                console.error('Veuillez sélectionner une séance.');
                return;
            }
            const dynamicKey = `etats${selectedSession.substring(7)}`;

            // Vérifiez si un statut de présence est sélectionné
            if (!presenceStatus) {
                console.error('Veuillez sélectionner un statut de présence.');
                return;
            }

            // Console.log() des données envoyées avec la requête
            console.log('Données envoyées avec la requête :', {
                Id: selectedStudentId,
                status: {
                    [selectedSession]: {
                        [dynamicKey]: presenceStatus
                    }
                }
            });



            // Envoyez une requête au serveur pour mettre à jour le statut de présence de l'étudiant
            const response = await axios.put('http://localhost:3001/api/users/:Id/status', {
                Id: selectedStudentId,
                status: {
                    [selectedSession]: {
                        [dynamicKey]: presenceStatus
                    }
                }
            });

            // Affichez un message de succès
            console.log('Statut de présence mis à jour avec succès :', response.data);

            // Fermez le modal après avoir soumis les changements
            handleclose();
        } catch (error) {
            // Gérez les erreurs
            console.error('Erreur lors de la mise à jour du statut de présence :', error);
        }
    };














    return (
        <>
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
                            <tr key={student.Id}>
                                <td>{student.Id}</td>
                                <td>{student.username}</td>
                                <td>{student.status.session1 ? `${student.status.session1.room1} - ${student.status.session1.etats1}` : ''}</td>
                                <td>{student.status.session2 ? `${student.status.session2.room2} - ${student.status.session2.etats2}` : ''}</td>
                                <td>{student.status.session3 ? `${student.status.session3.room3} - ${student.status.session3.etats3}` : ''}</td>
                                <td>{student.status.session4 ? `${student.status.session4.room4} - ${student.status.session4.etats4}` : ''}</td>
                                <td>
                                    <button className="bout2" onClick={() => handleModifyClick(student.Id)}> {/* Passez l'ID de l'étudiant à handleModifyClick */}
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
                                <Button variant="primary" onClick={() => handleSubmit(selectedStudentId)}> {/* Utilisez une fonction fléchée */}
                                    Save Changes
                                </Button>

                            </Modal.Footer>
                        </Modal>
                    </div>
                )}


            </div>
            <div className="footer">
                {/* Bouton de déconnexion */}
                <button onClick={handleLogout}>Déconnexion</button>
            </div>




        </>
    )
}
export default Dashboardprof