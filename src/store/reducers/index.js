import { combineReducers } from 'redux';
import { SessionAction, UsersAction } from '../actions';
import SessionReducer from './session';
import UserReducer from './users';

/* Combine every reducers for store initialization. */
export default combineReducers({
    [SessionAction.Key]: SessionReducer,
    [UsersAction.Key]: UserReducer
});
