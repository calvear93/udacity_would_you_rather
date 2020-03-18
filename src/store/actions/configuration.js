import { createAction, createActionTypes } from './shared';

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
     * @memberof ConfigurationAction
     */
    Key: KEY,

    /**
     * Action Types.
     *
     * @memberof ConfigurationAction
     */
    Types: createActionTypes(KEY, {
        GET: 'GET',
        ADD: 'ADD',
        DELETE: 'DELETE',
        RESET: 'RESET'
    }),

    /**
     * Returns the action.
     *
     * @param {Symbol} type Action type.
     * @param {any} payload Data involved in the action.
     * @memberof ConfigurationAction
     * @returns {func} Action.
     */
    Action: (type, payload) => createAction(KEY, type, payload)
};

export default Object.freeze(ConfigurationAction);
