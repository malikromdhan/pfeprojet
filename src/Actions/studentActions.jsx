import axios from 'axios';
import { studentsconstant, addstudent, updatestudent, deletestudent, updatestudentstatus } from './types';

// Action pour lister les étudiants
export const listerstudents = () => {
    return async (dispatch) => {
        dispatch({ type: studentsconstant.FETCH_STUDENTS_REQUEST });

        try {
            const res = await axios.get(''); // Remplacez cette chaîne vide par l'URL de votre endpoint API
            if (res.status === 200) {
                dispatch({
                    type: studentsconstant.FETCH_STUDENTS_SUCCESS,
                    payload: { students: res.data }
                });
            }
        } catch (error) {
            dispatch({
                type: studentsconstant.FETCH_STUDENTS_FAILURE,
                payload: { error: error.response }
            });
        }
    };
};

// Action pour ajouter un étudiant
export const ajouterEtudiant = (studentData) => {
    return async (dispatch) => {
        dispatch({ type: addstudent.ADD_STUDENTS_REQUEST });

        try {
            const res = await axios.post('', studentData); // Remplacez cette chaîne vide par l'URL de votre endpoint API
            if (res.status === 201) {
                dispatch({
                    type: addstudent.ADD_STUDENTS_SUCCESS,
                    payload: { students: res.data }
                });
            }
        } catch (error) {
            dispatch({
                type: addstudent.ADD_STUDENTS_FAILURE,
                payload: { error: error.response }
            });
        }
    };
};

// Action pour mettre à jour les coordonnées d'un étudiant
export const modifierEtudiant = (studentId, updatedData) => {
    return async (dispatch) => {
        dispatch({ type: updatestudent.UPDATE_STUDENTS_REQUEST });

        try {
            const res = await axios.put(`/${studentId}`, updatedData); // Remplacez cette chaîne vide par l'URL de votre endpoint API
            if (res.status === 200) {
                dispatch({
                    type: updatestudent.UPDATE_STUDENTS_SUCCESS,
                    payload: { students: res.data }
                });
            }
        } catch (error) {
            dispatch({
                type: updatestudent.UPDATE_STUDENTS_FAILURE,
                payload: { error: error.response }
            });
        }
    };
};

// Action pour supprimer un étudiant
export const supprimerEtudiant = (studentId) => {
    return async (dispatch) => {
        dispatch({ type: deletestudent.DELETE_STUDENTS_REQUEST });

        try {
            const res = await axios.delete(`/${studentId}`); // Remplacez cette chaîne vide par l'URL de votre endpoint API
            if (res.status === 204) {
                dispatch({
                    type: deletestudent.DELETE_STUDENTS_SUCCESS,
                    payload: { studentId }
                });
            }
        } catch (error) {
            dispatch({
                type: deletestudent.DELETE_STUDENTS_FAILURE,
                payload: { error: error.response }
            });
        }
    };
};

// Action pour modifier le statut de présence d'un étudiant
export const modifierStatutPresenceEtudiant = (studentId, newStatus) => {
    return async (dispatch) => {
        dispatch({ type: updatestudentstatus.UPDATE_STUDENTS_STATUS_REQUEST });

        try {
            const res = await axios.patch(`/${studentId}`, { status: newStatus }); // Remplacez cette chaîne vide par l'URL de votre endpoint API
            if (res.status === 200) {
                dispatch({
                    type: updatestudentstatus.UPDATE_STUDENTS_STATUS_SUCCESS,
                    payload: { student: res.data }
                });
            }
        } catch (error) {
            dispatch({
                type: updatestudentstatus.UPDATE_STUDENTS_STATUS_FAILURE,
                payload: { error: error.response }
            });
        }
    };
};
