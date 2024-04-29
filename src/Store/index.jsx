import store from './store';



import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Si vous utilisez Redux Thunk pour les actions asynchrones
import rootReducer from '../reducers'; // L'index des reducers combinés

// Création du store avec les reducers combinés et l'application du middleware
const store = createStore(rootReducer, applyMiddleware(thunk)); // Vous pouvez ajouter d'autres middlewares ici si nécessaire

export default store;
