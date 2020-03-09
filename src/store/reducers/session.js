import { SessionAction } from '../actions';

/**
 * Redux Action Reducer.
 *
 * @param {any} [state = {}] Current state.
 * @param {any} action Action dispatched.
 * @returns {any} Action state.
 */
function SessionReducer(state = {}, action)
{
    switch (action.type)
    {
        case SessionAction.Types.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}

export default SessionReducer;
