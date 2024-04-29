import './dashboardetudiant.css';
import { useState } from 'react';






const DashboardEtudiant = () => {

  const studentsData = [
    { id: 1, name: "malek romdhane", session1: { room: "salle 3", status: "Présent" }, session2: { room: "salle 5", status: "Absent" }, session3: { room: "salle 5", status: "Présent" }, session4: { room: "salle 10", status: "Absent" }, date: "2024-04-21", class: "A" },
    { id: 2, name: "yosri chafcher", session1: { room: "salle 4", status: "Absent" }, session2: { room: "salle 3", status: "Présent" }, session3: { room: "salle 7", status: "Absent" }, session4: { room: "salle 9", status: "Présent" }, date: "2024-04-21", class: "B" },
    { id: 3, name: "mohammed x", session1: { room: "salle 1", status: "Présent" }, session2: { room: "salle 2", status: "Absent" }, session3: { room: "salle 6", status: "Présent" }, session4: { room: "salle 5", status: "Absent" }, date: "2024-04-21", class: "C" },
    { id: 4, name: "ali", session1: { room: "salle 1", status: "Absent" }, session2: { room: "salle 2", status: "Présent" }, session3: { room: "salle 6", status: "Absent" }, session4: { room: "salle 5", status: "Présent" }, date: "2024-04-21", class: "C" },
    // Ajouter d'autres étudiants si nécessaire
];




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
                      
                        </tr>
                    ))}

                </tbody>
            </table>

 


    </div>
  )
}

export default DashboardEtudiant;