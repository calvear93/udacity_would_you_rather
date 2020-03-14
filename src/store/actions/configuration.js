import { createAction, createActionTypesMirroringUnique } from './shared';

// Store partition key.
const KEY = 'CONFIGURATION';

/**
 * Redux Action container.
 *
 * @class ConfigurationAction
 * @export ConfigurationAction
 */
const ConfigurationAction =
{

    /**
     * Action Store Key.
     *
     * @memberof AppAction
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof AppAction
     */
    Types: createActionTypesMirroringUnique([
        'GET',
        'ADD',
        'DELETE',
        'RESET'
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

export default Object.freeze(ConfigurationAction);
