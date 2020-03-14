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
     * @memberof AppAction
     */
    Types: createActionTypesMirroringUnique([
        'GET',
        'GET_ALL',
        'CREATE',
        'UPDATE',
        'DELETE',
        'ERROR'
    ]),

    /**
     * Returns the action.
     *
     * @param {Symbol} type Action type.
     * @param {any} payload Data involved in the action.
     * @memberof AppAction
     * @returns {func} Action.
     */
    Action: (type, payload) => createAction(KEY, type, payload)
};

export default Object.freeze(UsersAction);
