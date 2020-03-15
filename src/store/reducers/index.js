import { combineReducers } from 'redux';
import {
    ConfigurationAction,
    QuestionsAction,
    SessionAction,
    UsersAction
} from '../actions';
import ConfigurationReducer from './configuration';
import QuestionsReducer from './questions';
import SessionReducer from './session';
import UserReducer from './users';

/* Combine every reducers for store initialization. */
export default combineReducers({
    [ConfigurationAction.Key]: ConfigurationReducer,
    [QuestionsAction.Key]: QuestionsReducer,
    [SessionAction.Key]: SessionReducer,
    [UsersAction.Key]: UserReducer
});
