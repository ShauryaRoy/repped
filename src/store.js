import { createStore } from 'redux';
import cartReducer from './cartReducer'; // Assume you have some reducers

const store = createStore(cartReducer);

export default store;
