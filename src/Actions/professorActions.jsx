import axios from 'axios';
import { professorConstants, addprofessor, updateprof, deleteprofs  } from './types';

// Action pour récupérer la liste des professeurs
export const listProfessors = () => {
    return async (dispatch) => {
        dispatch({ type: professorConstants.FETCH_PROFESSORS_REQUEST });

        try {
            const res = await axios.get('URL_VERS_API_PROFESSEURS');
            if (res.status === 200) {
                dispatch({
                    type: professorConstants.FETCH_PROFESSORS_SUCCESS,
                    payload: { professors: res.data }
                });
            }
        } catch (error) {
            dispatch({
                type: professorConstants.FETCH_PROFESSORS_FAILURE,
                payload: { error: error.response }
            });
        }
    };
};

// Action pour ajouter un nouveau professeur
export const addProfessor = (professorData) => {
    return async (dispatch) => {
        dispatch({ type: addprofessor.ADD_PROFESSORS_REQUEST });

        try {
            const res = await axios.post('URL_POUR_AJOUTER_PROFESSEUR', professorData);
            if (res.status === 201) {
                dispatch({ type: addprofessor.ADD_PROFESSORS_SUCCESS });
                // Vous pouvez également mettre à jour la liste des professeurs après l'ajout réussi si nécessaire
                dispatch(listProfessors());
            }
        } catch (error) {
            dispatch({
                type: addprofessor.ADD_PROFESSORS_FAILURE,
                payload: { error: error.response }
            });
        }
    };
};

// Action pour mettre à jour les informations d'un professeur
export const updateProfessor = (professorId, professorData) => {
    return async (dispatch) => {
        dispatch({ type: updateprof.UPDATE_PROFESSORS_REQUEST });

        try {
            const res = await axios.put(`URL_POUR_MODIFIER_PROFESSEUR/${professorId}`, professorData);
            if (res.status === 200) {
                dispatch({ type: updateprof.UPDATE_PROFESSORS_SUCCESS });
                // Vous pouvez également mettre à jour la liste des professeurs après la modification réussie si nécessaire
                dispatch(listProfessors());
            }
        } catch (error) {
            dispatch({
                type: updateprof.UPDATE_PROFESSORS_FAILURE,
                payload: { error: error.response }
            });
        }
    };
};

// Action pour supprimer un professeur
export const deleteProfessor = (professorId) => {
    return async (dispatch) => {
        dispatch({ type: deleteprofs.DELETE_PROFESSORS_REQUEST });

        try {
            const res = await axios.delete(`URL_POUR_SUPPRIMER_PROFESSEUR/${professorId}`);
            if (res.status === 200) {
                dispatch({ type: deleteprofs.DELETE_PROFESSORS_SUCCESS });
                // Vous pouvez également mettre à jour la liste des professeurs après la suppression réussie si nécessaire
                dispatch(listProfessors());
            }
        } catch (error) {
            dispatch({
                type: deleteprofs.DELETE_PROFESSORS_FAILURE,
                payload: { error: error.response }
            });
        }
    };
};
