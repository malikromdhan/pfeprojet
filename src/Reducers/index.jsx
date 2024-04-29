import { combineReducers } from 'redux';
import studentReducer from './reducer.student';
import professorReducer from './reducer.prof';

const rootReducer = combineReducers({
    students: studentReducer,
    professors: professorReducer
});

export default rootReducer;
