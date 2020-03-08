import { combineReducers } from 'redux';
import UsersAction from '../actions/users';
import UserReducer from './users';

/* Combine every reducers for store initialization. */
export default combineReducers({
    [UsersAction.Key]: UserReducer
});
