import { createAction, createActionTypes } from './shared';

// Store partition key.
const KEY = 'SESSION';

/**
 * Redux Action container.
 *
 * @class SessionAction
 * @export SessionAction
 */
const SessionAction =
{

    /**
     * Action Store Key.
     *
     * @memberof SessionAction
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof SessionAction
     */
    Types: createActionTypes(KEY, {
        LOGIN: 'LOGIN',
        LOGIN_SUCCESS: 'LOGIN_SUCCESS',
        LOGOUT: 'LOGOUT',
        LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
        STATUS: 'STATUS',
        REDIRECT_ATTEMPT: 'REDIRECT_ATTEMPT',
        REDIRECT_SUCCESS: 'REDIRECT_SUCCESS',
        ERROR: 'ERROR'
    }),

    /**
     * Keys for data stored in cookies.
     *
     * @memberof SessionAction
     */
    CookiesKeys: createActionTypes(KEY, {
        SESSION: 'SESSION'
    }),

    /**
     * Returns the action.
     *
     * @param {Symbol} type Action type.
     * @param {any} payload Data involved in the action.
     * @memberof SessionAction
     * @returns {func} Action.
     */
    Action: (type, payload) => createAction(KEY, type, payload)
};

export default Object.freeze(SessionAction);
