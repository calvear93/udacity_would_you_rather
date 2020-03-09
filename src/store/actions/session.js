import { createAction, createActionTypes } from './shared';

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
     * @memberof AppAction
     */
    Key: 'SESSION',

    /**
     * Action Types.
     *
     * @memberof AppAction
     */
    Types: createActionTypes({
        LOGIN: 'LOGIN',
        LOGIN_SUCCESS: 'LOGIN_SUCCESS',
        LOGOUT: 'LOGOUT',
        LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
        STATUS: 'STATUS',
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
    Action: (type, payload) => createAction(SessionAction.Key, type, payload)
};

export default Object.freeze(SessionAction);
