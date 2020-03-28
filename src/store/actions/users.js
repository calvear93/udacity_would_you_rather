import { createAction, createActionTypes } from './shared';

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
    Types: createActionTypes(KEY, {
        GET_ALL: 'GET_ALL',
        FETCH_ALL: 'FETCH_ALL',
        FETCH_ALL_SUCCESS: 'FETCH_ALL_SUCCESS',
        CREATE: 'CREATE',
        CREATE_SUCCESS: 'CREATE_SUCCESS',
        UPDATE: 'UPDATE',
        UPDATE_SUCCESS: 'UPDATE_SUCCESS',
        DELETE: 'DELETE',
        DELETE_SUCCESS: 'DELETE_SUCCESS',
        ADD_ANSWER: 'ADD_ANSWER',
        ADD_QUESTION: 'ADD_QUESTION',
        ERROR: 'ERROR'
    }),

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
