import { combineReducers } from 'redux';
import {
    ConfigurationAction,
    SessionAction,
    UsersAction
} from '../actions';
import ConfigurationReducer from './configuration';
import SessionReducer from './session';
import UserReducer from './users';

/* Combine every reducers for store initialization. */
export default combineReducers({
    [ConfigurationAction.Key]: ConfigurationReducer,
    [SessionAction.Key]: SessionReducer,
    [UsersAction.Key]: UserReducer
});
