import { createAction, createActionTypesMirroringUnique } from './shared';

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
    Types: createActionTypesMirroringUnique([
        'LOGIN',
        'LOGIN_SUCCESS',
        'LOGOUT',
        'LOGOUT_SUCCESS',
        'STATUS',
        'ERROR'
    ]),

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
