import { combineReducers } from 'redux';
import AppAction from '../actions/app';
import AppReducer from './app';

/* Combine every reducers for store initialization. */
export default combineReducers({
    [AppAction.Key]: AppReducer
});
