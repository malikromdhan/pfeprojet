import { studentsconstant, addstudent, updatestudent, deletestudent, updatestudentstatus } from '../Actions/types';

const initialState = {
    students: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case studentsconstant.FETCH_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case studentsconstant.FETCH_STUDENTS_SUCCESS:
            return {
                ...state,
                students: action.payload.students,
                loading: false
            };
        case studentsconstant.FETCH_STUDENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case addstudent.ADD_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case addstudent.ADD_STUDENTS_SUCCESS:
            return {
                ...state,
                students: [...state.students, action.payload.student],
                loading: false
            };
        case addstudent.ADD_STUDENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case updatestudent.UPDATE_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case updatestudent.UPDATE_STUDENTS_SUCCESS:
            return {
                ...state,
                students: state.students.map(student => student.id === action.payload.student.id ? action.payload.student : student),
                loading: false
            };
        case updatestudent.UPDATE_STUDENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case deletestudent.DELETE_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case deletestudent.DELETE_STUDENTS_SUCCESS:
            return {
                ...state,
                students: state.students.filter(student => student.id !== action.payload.studentId),
                loading: false
            };
        case deletestudent.DELETE_STUDENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case updatestudentstatus.UPDATE_STUDENTS_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case updatestudentstatus.UPDATE_STUDENTS_STATUS_SUCCESS:
            return {
                ...state,
                students: state.students.map(student => student.id === action.payload.student.id ? action.payload.student : student),
                loading: false
            };
        case updatestudentstatus.UPDATE_STUDENTS_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        default:
            return state;
    }
};
