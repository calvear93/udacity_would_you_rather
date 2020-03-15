import { createAction, createActionTypesMirroringUnique } from './shared';

// Store partition key.
const KEY = 'USERS';

/**
 * Redux Action container.
 *
 * @class UsersAction
 * @export UsersAction
 */
const UsersAction =
{

    /**
     * Action Store Key.
     *
     * @memberof UsersAction
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof UsersAction
     */
    Types: createActionTypesMirroringUnique([
        'GET_ALL',
        'FETCH_ALL',
        'FETCH_ALL_SUCCESS',
        'CREATE',
        'CREATE_SUCCESS',
        'UPDATE',
        'UPDATE_SUCCESS',
        'DELETE',
        'DELETE_SUCCESS',
        'ERROR'
    ]),

    /**
     * Returns the action.
     *
     * @param {Symbol} type Action type.
     * @param {any} payload Data involved in the action.
     * @memberof UsersAction
     * @returns {func} Action.
     */
    Action: (type, payload) => createAction(KEY, type, payload)
};

export default Object.freeze(UsersAction);
