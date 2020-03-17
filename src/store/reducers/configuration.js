import { ConfigurationAction } from '../actions';
import { ConfigurationDefaults } from './defaults';

/**
 * Redux Action Reducer.
 *
 * @param {any} [state = ConfigurationDefaults] Current state.
 * @param {any} action Action dispatched.
 * @returns {any} Action state.
 */
function ConfigurationReducer(state = ConfigurationDefaults, action)
{
    switch (action.type)
    {
        // Gets the current configuration.
        case ConfigurationAction.Types.GET:
            return { ...state };

        // Modifies configuration.
        case ConfigurationAction.Types.ADD:
            return {
                ...Object.assign(
                    { ...state },
                    action.payload
                )
            };
        // Deletes a configuration.
        case ConfigurationAction.Types.DELETE:
            delete state[action.payload];

            return { ...state };

        // Resets the configuration
        case ConfigurationAction.Types.RESET:
            return { ...ConfigurationDefaults };

        default:
            return state;
    }
}

export default ConfigurationReducer;
