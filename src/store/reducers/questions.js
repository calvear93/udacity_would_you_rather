import { QuestionsAction } from '../actions';

/**
 * Redux Action Reducer.
 *
 * @param {any} [state = {}] Current state.
 * @param {any} action Action dispatched.
 * @returns {any} Action state.
 */
function QuestionsReducer(state = {}, action)
{
    switch (action.type)
    {
        // Gets all question from store.
        case QuestionsAction.Types.GET_ALL:
            return {
                ...state
            };

        // Adds a new question.
        case QuestionsAction.Types.CREATE:
            return {
                ...state,
                loading: true
            };

        // Create question action succeeded.
        case QuestionsAction.Types.CREATE_SUCCESS:

            return {
                questions: Object.assign(
                    { ...state.questions },
                    {
                        [action.payload.id]: action.payload
                    }
                ),
                loading: false
            };

        // Deletes a question.
        case QuestionsAction.Types.DELETE:
            delete state.questions[action.payload.id];

            return {
                ...state,
                loading: false
            };

        // Fetches all question from service.
        case QuestionsAction.Types.FETCH_ALL:
            return {
                ...state,
                // Loader doesn't show when any data is already loaded in store.
                loading: !state.questions || Object.keys(state.questions).length === 0
            };

        // Fetching action succeeded.
        case QuestionsAction.Types.FETCH_ALL_SUCCESS:
            return {
                questions: action.payload,
                loading: false
            };

        // Error on some action.
        case QuestionsAction.Types.ERROR:
            return {
                ...state,
                ...action.payload,
                loading: false
            };

        default:
            return state;
    }
}

export default QuestionsReducer;
