import { professorConstants, addprofessor, updateprof, deleteprofs } from '../Actions/types';

const initialState = {
    professors: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case professorConstants.FETCH_PROFESSORS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case professorConstants.FETCH_PROFESSORS_SUCCESS:
            return {
                ...state,
                professors: action.payload.professors,
                loading: false
            };

        case professorConstants.FETCH_PROFESSORS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case addprofessor.ADD_PROFESSORS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case addprofessor.ADD_PROFESSORS_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case addprofessor.ADD_PROFESSORS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case updateprof.UPDATE_PROFESSORS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case updateprof.UPDATE_PROFESSORS_SUCCESS:
            return {
                ...state,
                loading: false
            };

        case updateprof.UPDATE_PROFESSORS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case deleteprofs.DELETE_PROFESSORS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case deleteprofs.DELETE_PROFESSORS_SUCCESS:
            return {
                ...state,
                professors: state.professors.filter(professor => professor.id !== action.payload.professorId),
                loading: false
            };

        case deleteprofs.DELETE_PROFESSORS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        default:
            return state;
    }
};
