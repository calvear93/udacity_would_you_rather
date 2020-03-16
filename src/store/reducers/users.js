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
        // Gets all users,
        case UsersAction.Types.GET_ALL:
            return state;

        // Fetches all users from service.
        case UsersAction.Types.FETCH_ALL:
            return {
                ...state,
                loading: true
            };

        // Fetching users succeeded.
        case UsersAction.Types.FETCH_ALL_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };

        // Any action error.
        case UsersAction.Types.ERROR:
            return {
                ...state,
                ...action.payload,
                loading: false
            };

        default:
            return state;
    }
}

export default UsersReducer;
