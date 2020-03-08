import { createAction, createActionTypes } from './shared';

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
    Key: 'USERS',

    /**
     * Action Types.
     *
     * @memberof AppAction
     */
    Types: createActionTypes({
        GET_ALL: 'GET_ALL',
        GET: 'GET',
        CREATE: 'CREATE',
        UPDATE: 'UPDATE',
        DELETE: 'DELETE',
        ERROR: 'ERROR'
    }),

    /**
     * Returns the action.
     *
     * @param {Symbol} type Action type.
     * @param {any} payload Data involved in the action.
     * @memberof AppAction
     * @returns {func} Action.
     */
    Action: (type, payload) => createAction(UsersAction.Key, type, payload)
};

export default Object.freeze(UsersAction);
