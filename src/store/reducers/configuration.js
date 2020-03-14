import { ConfigurationAction } from '../actions';

// Default state.
const defaults = {
    minInputLength: 3,
    options: [ 'optionOne', 'optionTwo' ]
};

/**
 * Redux Action Reducer.
 *
 * @param {any} [state = defaults] Current state.
 * @param {any} action Action dispatched.
 * @returns {any} Action state.
 */
function ConfigurationReducer(state = defaults, action)
{
    switch (action.type)
    {
        case ConfigurationAction.Types.GET:
            return { ...state };

        case ConfigurationAction.Types.ADD:
            return {
                ...Object.assign(
                    state,
                    action.payload
                )
            };

        case ConfigurationAction.Types.DELETE:
            delete state[action.payload];

            return { ...state };

        case ConfigurationAction.Types.RESET:
            return { ...defaults };

        default:
            return state;
    }
}

export default ConfigurationReducer;
