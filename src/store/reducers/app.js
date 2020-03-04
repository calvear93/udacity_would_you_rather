import AppAction from '../actions/app';

/**
 * Redux Action Reducer.
 *
 * @param {any} [state = {}] Current state.
 * @param {any} action Action dispatched.
 * @returns {any} Action state.
 */
function AppReducer(state = {}, action)
{
    switch (action.type)
    {
        // Updates current state for the action.
        case AppAction.Types.UPDATE:
            return {
                ...state,
                ...action.payload
            };

        // On data fetching error.
        case AppAction.Types.REMOVE:
            delete state[action.payload];

            return {
                ...state
            };

        // Clears state for the action.
        case AppAction.Types.CLEAR:
            return {};

        default:
            return state;
    }
}

export default AppReducer;
