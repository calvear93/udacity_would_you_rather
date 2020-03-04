import { createAction, createActionTypesMirroring } from './shared';

/**
 * Redux Action container.
 *
 * @class AppAction
 * @export AppAction
 */
const AppAction =
{

    /**
     * Action Store Key.
     *
     * @memberof AppAction
     */
    Key: 'APP',

    /**
     * Action Types.
     *
     * @memberof AppAction
     */
    Types: createActionTypesMirroring([
        'FETCH',
        'UPDATE',
        'REMOVE',
        'CLEAR'
    ]),

    /**
     * Returns the action.
     *
     * @param {Symbol} type Action type.
     * @param {any} payload Data involved in the action.
     * @memberof AppAction
     * @returns {func} Action.
     */
    Action: (type, payload) => createAction(AppAction.Key, type, payload)
};

export default Object.freeze(AppAction);
