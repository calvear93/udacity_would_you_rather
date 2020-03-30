import { SessionAction } from '../actions';
import { SessionDefaults } from './defaults';

/**
 * Redux Action Reducer.
 *
 * @param {any} [state = SessionDefaults] Current state.
 * @param {any} action Action dispatched.
 * @returns {any} Action state.
 */
function SessionReducer(state = SessionDefaults, action)
{
    switch (action.type)
    {
        // User login.
        case SessionAction.Types.LOGIN:
            return {
                ...state,
                loading: true
            };

        // User login succeeded.
        case SessionAction.Types.LOGIN_SUCCESS:
            return {
                ...action.payload,
                authenticated: true,
                loading: false
            };

        // User logout.
        case SessionAction.Types.LOGOUT:
            return {
                ...state,
                loading: true
            };

        // Logout succeeded.
        case SessionAction.Types.LOGOUT_SUCCESS:
            return {
                authenticated: false
            };

        case SessionAction.Types.REDIRECT_ATTEMPT:
            return {
                ...state,
                redirect: action.payload.pathname
            };

        case SessionAction.Types.REDIRECT_SUCCESS:
            delete state.redirect;

            return {
                ...state
            };

        // Any action error.
        case SessionAction.Types.ERROR:
            return {
                ...state,
                ...action.payload,
                loading: false
            };

        default:
            return state;
    }
}

export default SessionReducer;
