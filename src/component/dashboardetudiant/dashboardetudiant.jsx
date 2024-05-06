import './dashboardetudiant.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importez Axios ou une autre bibliothèque HTTP






const DashboardEtudiant = () => {

    const [studentsData, setStudentsData] = useState([]);



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









    // fonction pour la deconnection 

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };



    return (
        <>
            <div className="dashboardetudiant-container">
                <header className='headr'>
                    <nav>
                        <h2>
                            student Dashboard
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
                            </tr>
                        ))}

                    </tbody>
                </table>




            </div>
            <div className="footer">
                {/* Bouton de déconnexion */}
                <button onClick={handleLogout}>Déconnexion</button>
            </div>



        </>


    )
}

export default DashboardEtudiant;