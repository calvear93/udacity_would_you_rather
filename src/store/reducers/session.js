import { SessionAction } from '../actions';

/**
 * Redux Action Reducer.
 *
 * @param {any} [state = {}] Current state.
 * @param {any} action Action dispatched.
 * @returns {any} Action state.
 */
function SessionReducer(state = { authenticated: false }, action)
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
                ...state,
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
