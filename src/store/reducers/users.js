import UsersAction from '../actions/users';

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
        case UsersAction.Types.CREATE:
            return {
                ...state,
                users: action.payload
            };

        default:
            return state;
    }
}

export default UsersReducer;
