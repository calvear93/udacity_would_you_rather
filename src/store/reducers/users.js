import { UsersAction } from '../actions';

/**
 * Redux Action Reducer.
 *
 * @param {any} [state = {}] Current state.
 * @param {any} action Action dispatched.
 * @returns {any} Action state.
 */
function UsersReducer(state = {}, action)
{
    switch (action.type)
    {
        case UsersAction.Types.UPDATE:
            return {
                ...state,
                users: action.payload
            };

        case UsersAction.Types.ERROR:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}

export default UsersReducer;
